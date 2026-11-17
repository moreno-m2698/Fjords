# 2026-11-16: Re-hosting Fjords on EC2

Fjords was offline: the old ALB, certificate, EC2 instance and self-hosted runner were gone, and the old pipeline could no longer build. This session put the app back online on AWS with a new GitHub Actions CI/CD pipeline.

- **Live URL:** http://3.128.85.239/ (HTTP only; no domain yet)
- **Branch:** `deploy/ec2`, PR [#2](https://github.com/moreno-m2698/Fjords/pull/2) to `main`
- **Estimated cost:** about $6–7/month

## Decisions

| Topic | Decision | Reason |
|---|---|---|
| Hosting | EC2 Spot t4g.micro (ARM, 1 GiB), us-east-2 | Cheapest EC2 option close to the $5–6/month target with no commitment. On-demand would be ~$10.45/month. |
| Spot behavior | Persistent request, stop on interruption | Keeps the disk and IP; the instance and container come back on their own. |
| Disk | 8 GB gp3 | Enough for one image; old images are pruned on each deploy. |
| Public IP | One Elastic IP | AWS charges $3.65/month for any public IPv4; an EIP keeps it stable. |
| Registry | ECR (private) instead of Docker Hub | Uses the same OIDC login, so no Docker credentials, and the image isn't public. |
| Deploy method | GitHub OIDC → IAM role → SSM Run Command | No SSH port, no stored AWS keys, no runner on the box. A self-hosted runner on a public repo would let fork PRs run code on the server. |
| Riot key | GitHub `prod` environment secret `RIOT_API_DEVELOPMENT_KEY` → SSM SecureString `/fjords/riot-api-key` → container env `RIOT_API_KEY` | Key is never baked into the image. The secret name is misleading (it's a production key) but was kept for now. |
| Domain | None for now | `fjordsdata.com` is still registered in Route 53; domain + HTTPS is a follow-up. |
| Image size | Exclude unused `ddragon/img/` from the jar | Jar went from 1.2 GB to 548 MB. |

## Code and repo changes

- `FjordsApplication.java`: `@PropertySource(..., ignoreResourceNotFound = true)` so the key can come from an env var.
- `pom.xml`: excludes `ddragon/img/**` (673 MB, never served) from the jar.
- `Dockerfile`: multi-arch `amazoncorretto:17-al2023-headless` base, correct jar name, JVM capped for a 1 GiB host (`-Xmx384m`, SerialGC).
- `.dockerignore`: build context is only the jar.
- `.github/workflows/deploy.yml`: on push to `main` builds the frontend, jar and arm64 image on `ubuntu-24.04-arm`, pushes to ECR, deploys via SSM, then health-checks `/` and `/api/asset/champion/Ahri`.
- `.github/workflows/rotate-key.yml`: manual run that re-sends the key and restarts the container without rebuilding.
- `.github/scripts/`: `run-container.sh` (runs on the host), `ssm-run.sh`, `health-check.sh`.
- Removed `.github/workflows/maven-publish.yml`: it baked the key into a public Docker Hub image and targeted a dead self-hosted runner.
- `infra/provision.sh`, `infra/user-data.sh`, `infra/README.md`: idempotent AWS CLI provisioning.
- `CLAUDE.md`: added Deployment section, updated key handling and known issues.

Production overrides set as env vars at `docker run`: SQL logging and Hibernate statistics off, Hibernate trace logging down to WARN, H2 console disabled.

## AWS changes (account 941202158343)

### Created (us-east-2 unless noted)

| Service | Resource |
|---|---|
| EC2 | Instance `i-004f5b7fb218e6012` (Name `fjords`, t4g.micro Spot), its 8 GB volume, Spot request `sir-fdsg2j8g` |
| EC2 | Elastic IP `3.128.85.239` (`eipalloc-0ed971500fcf7b3db`) |
| EC2 | Security group `sg-07a11106e90afa897` `fjords-web` (TCP 80 only) |
| VPC | Default subnets `subnet-05cb4054ef625fc84` (2a), `subnet-0e7a74f5624fe39c7` (2b), `subnet-0af91415e8e75013f` (2c) |
| VPC | Internet gateway `igw-0f175a36e6c6957bc` (`default-vpc-igw`) attached to default VPC `vpc-0cff8a5496945c453` |
| ECR | Repository `fjords` (keep last 5 images) |
| IAM (global) | OIDC provider `token.actions.githubusercontent.com` |
| IAM (global) | Role `fjords-gha-deploy` (trusts only `repo:moreno-m2698/Fjords:environment:prod`), inline policy `fjords-deploy` |
| IAM (global) | Role + instance profile `fjords-ec2`: AmazonSSMManagedInstanceCore, AmazonEC2ContainerRegistryReadOnly, inline `fjords-ssm-params` |
| SSM | Parameter `/fjords/riot-api-key` (SecureString) |

### Modified

- Route table `rtb-00e7b07179fdffbb9` (default VPC main table): 0.0.0.0/0 now points at `igw-0f175a36e6c6957bc`. It previously pointed at a deleted gateway (`blackhole`). Approved by the user.
- IAM user `admin`: its only access key (created 2023-08, last used 2023-08) set to **Inactive**, not deleted.

### Deleted

- EC2 key pair `fjords-admin`
- ACM certificate `*.fjordsdata.com` (expired 2025-04)
- Route 53 records in `fjordsdata.com`: `app.fjordsdata.com` A alias (pointed at the deleted ALB) and the ACM validation CNAME. The hosted zone, NS and SOA remain.
- RDS manual snapshot `rds-postgres-ex-snapshot` (2023)

### Left alone on purpose

`hatsune-online-database-snapshot`, `hatsuneonline.net` zone and certificate, Lambda `stringReversal`, key pair `study-cubby`, IAM users `moreno-python` and `claude`.

## GitHub changes

- Repo variables added: `AWS_ROLE_ARN`, `AWS_REGION`, `ECR_REPOSITORY`, `EC2_INSTANCE_ID`, `EC2_PUBLIC_IP`.
- Repo secrets deleted: `RIOT_API_KEY` (2024), `DOCKER_USERNAME`, `DOCKER_PASSWORD`.
- Environment `prod` secret `RIOT_API_DEVELOPMENT_KEY` unchanged.

## Cost breakdown (us-east-2, AWS Pricing API, 2026-11-16)

| Item | Monthly |
|---|---|
| t4g.micro Spot (observed $0.0024–0.0034/hr) | ~$1.75–2.50 |
| Public IPv4 | $3.65 |
| 8 GB gp3 | $0.64 |
| ECR storage | ~$0.05 |
| **Total for Fjords** | **~$6–7** |

Pre-existing account charges: Route 53 hosted zones (~$1.00) and the remaining hatsune RDS snapshot.

## Verification

- Deploy run from `deploy/ec2` succeeded on every step.
- `GET /` → 200 HTML; `GET /api/asset/champion/Ahri` → 200 PNG; `GET /h2` → 404.
- Host: Docker 25 on aarch64, 1 GB swap active, Docker log rotation configured, 4.9 GB disk free before first deploy.
- Riot key accepted: a lookup for a deleted account returned Riot's 404 "Data not found", not 401/403. A search for a real account has not been tried yet.

## Follow-ups

- Merge PR #2 (redeploys from `main`).
- Point `fjordsdata.com` at the Elastic IP and add HTTPS (e.g. Caddy + Let's Encrypt).
- Riot "not found" responses surface as HTTP 500; add error handling in the services.
- Delete the old public Docker Hub image `morenom2698/fjords-application` (contains a 2024 Riot key).
- Review the Dependabot alerts on `main` (101 reported, 1 critical).
- Optionally rename the `RIOT_API_DEVELOPMENT_KEY` secret and update both workflows.
