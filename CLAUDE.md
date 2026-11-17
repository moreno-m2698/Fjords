# CLAUDE.md

Fjords: Spring Boot 3.1 / Java 17 backend + React/Vite frontend that visualizes League of Legends ARAM match data from the Riot API. Setup details are in README.md.

## Commands

- Backend: `mvn spring-boot:run` (port 8080). No Maven wrapper is committed, so use `mvn` or run `FjordsApplication` in IntelliJ.
- Tests: `mvn test`. `FjordsTest` calls the live Riot API, so it needs a valid key and network access.
- Frontend (`frontend/`): `npm run watch` builds into `../src/main/resources/static`, which Spring Boot serves. `npm run dev` has no `/api` proxy, so API calls fail there.

## Environment

- Windows; shells vary (cmd, PowerShell, Git Bash). Match syntax to the shell.
- JDK: Corretto 17 at `C:\Users\Michael Moreno\.jdks\corretto-17.0.21` (`JAVA_HOME` points here). On Java errors, first check this path still exists.
- IntelliJ: the project must be imported as Maven, or running gives `ClassNotFoundException: ...FjordsApplication`.

## Riot API key

- Locally: `src/main/resources/productionKey.txt` (optional via `@PropertySource(..., ignoreResourceNotFound = true)`) containing `riot.api.key=RGAPI-...`. Template: `exampleProductionKey.txt`. Alternatively set env var `RIOT_API_KEY`.
- Production: GitHub environment `prod` secret `RIOT_API_DEVELOPMENT_KEY` (a production key despite the name). CI copies it to SSM SecureString `/fjords/riot-api-key`; the container gets it as `RIOT_API_KEY`.
- A 401/403 from Riot means the key is invalid/expired. A 404 "Data not found" means the key works.
- Never read or print key files (`productionKey.txt`, `devKey.txt`, `.env`).

## Architecture

- Package `howlingabysstool.howlingabysstoolapi` (old name). `controller/` → `service/` (interface + `*Impl`) → `repository/` (JPA).
- `domain/` separates Riot response shapes (`RiotMatch/`, `RiotApiMatchTimeline/`) from Fjords models (`FjordDbModels/`, `FjordApiMatchTimeline/`).
- In-memory H2 (`jdbc:h2:mem:cache`, console at `/h2` locally, disabled in production); data resets on restart.
- Only `ddragon/14.1.1/img/` is served; `ddragon/img/` is excluded from the jar in `pom.xml`.
- Exclude `src/main/resources/ddragon/` (thousands of images) from searches.

## Deployment

- Push to `main` → `.github/workflows/deploy.yml`: builds frontend + jar + arm64 image on `ubuntu-24.04-arm`, pushes to ECR `fjords`, deploys via SSM (GitHub OIDC → IAM role `fjords-gha-deploy`), then health-checks `/` and `/api/asset/champion/Ahri`.
- `rotate-key.yml` (manual): re-sends the key and restarts the container without rebuilding.
- Host: EC2 Spot t4g.micro `fjords` in us-east-2, Elastic IP in repo variable `EC2_PUBLIC_IP`, port 80 only, no SSH. Shell: `aws ssm start-session`. Infra: `infra/provision.sh` (idempotent), see `infra/README.md`.
- Budget is ~$5–7/month; don't add paid resources (ALB, NAT, extra IPv4) without asking.

## Known issues

- Riot "not found" responses surface as HTTP 500 from the API (no error handling in services).
- Old public Docker Hub image `morenom2698/fjords-application` (no longer used) contains a 2024 Riot key.
- `devKey.txt` and `.env` are tracked in git (contents unverified).
- `.gitignore` ignores itself and the Maven wrapper.
- Old names remain: `howlingabysstool` package, `aramfrontend` in `frontend/package.json`.

## Asking questions

- Always ask clarifying questions through the question prompt tool (AskUserQuestion), never as plain text in a reply. Put a recommended default first in each prompt.

## Git

- `origin` → `github.com/moreno-m2698/AramMatchDataProject` (redirects; repo is now `moreno-m2698/Fjords`). Branches: `main`, `dev`, `refactor`, `deploy/ec2`.
- Pushing to `main` deploys to production. Never push to `main` without explicit instruction.
