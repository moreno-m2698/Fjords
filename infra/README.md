# Fjords infrastructure (AWS us-east-2)

`provision.sh` creates (or reuses) everything the deploy pipeline needs. It is safe to re-run.
It needs the AWS CLI logged in to account 941202158343 and `gh` logged in to the repo.

```bash
bash infra/provision.sh
```

## What it creates

| Resource | Name | Purpose |
|---|---|---|
| ECR repository | `fjords` | Docker images (keeps last 5) |
| IAM OIDC provider | `token.actions.githubusercontent.com` | Lets GitHub Actions log in without stored AWS keys |
| IAM role | `fjords-gha-deploy` | Assumed by GitHub Actions in the `prod` environment only: push to ECR, write `/fjords/*` SSM parameters, send SSM commands to the instance |
| IAM role + instance profile | `fjords-ec2` | Instance: SSM management, ECR pull, read `/fjords/*` |
| Security group | `fjords-web` | Inbound TCP 80 only (no SSH) |
| EC2 instance | `fjords` | t4g.micro Spot (persistent, stops on interruption), Amazon Linux 2023 arm64, 8 GB gp3, IMDSv2 |
| Elastic IP | `fjords` | Stable public IP |
| GitHub repo variables | `AWS_ROLE_ARN`, `AWS_REGION`, `ECR_REPOSITORY`, `EC2_INSTANCE_ID`, `EC2_PUBLIC_IP` | Read by the workflows |

It also repairs the us-east-2 default VPC if it is missing its default subnets or internet gateway.

`user-data.sh` runs on first boot: installs Docker, adds 1 GB swap, and turns on Docker log rotation.

## Deploying

- `.github/workflows/deploy.yml` builds and deploys on push to `main`.
- `.github/workflows/rotate-key.yml` (run manually) pushes the current `RIOT_API_DEVELOPMENT_KEY` secret to the instance and restarts the container without rebuilding.
- The key is stored as SecureString `/fjords/riot-api-key` and read on the instance at container start.

## Cost (approx.)

About $6–7/month: Spot t4g.micro (~$1.75–2.50, varies), public IPv4 ($3.65), 8 GB gp3 ($0.64), ECR storage (~$0.05).

## Common operations

- Shell on the box (no SSH): `aws ssm start-session --region us-east-2 --target <instance-id>` (needs the Session Manager plugin).
- More memory: stop the instance, then `aws ec2 modify-instance-attribute --region us-east-2 --instance-id <id> --instance-type t4g.small` (~$6/mo more on-demand price cap), then start it.
- After a Spot interruption the instance restarts by itself when capacity returns; Docker and the container (`--restart unless-stopped`) come back automatically.
