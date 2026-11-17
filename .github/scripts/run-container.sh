#!/usr/bin/env bash
# Runs ON the EC2 host (sent via SSM). Expects IMAGE to be set by the caller
# (a line "IMAGE=..." is prepended before this file is sent). Contains no secrets:
# the Riot key is fetched from SSM Parameter Store on the box.
set -euo pipefail
REGION=us-east-2
REGISTRY="${IMAGE%%/*}"
KEY=$(aws ssm get-parameter --region "$REGION" --name /fjords/riot-api-key --with-decryption --query Parameter.Value --output text)
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$REGISTRY"
docker pull "$IMAGE"
docker rm -f fjords || true
docker run -d --name fjords --restart unless-stopped -p 80:8080 --memory 800m \
  -e RIOT_API_KEY="$KEY" \
  -e SPRING_JPA_SHOW_SQL=false \
  -e SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=false \
  -e SPRING_JPA_PROPERTIES_HIBERNATE_GENERATE_STATISTICS=false \
  -e LOGGING_LEVEL_ORG_HIBERNATE_TYPE=WARN -e LOGGING_LEVEL_ORG_HIBERNATE_STAT=WARN \
  -e LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_JDBC=INFO \
  -e SPRING_H2_CONSOLE_ENABLED=false \
  "$IMAGE"
docker image prune -af
