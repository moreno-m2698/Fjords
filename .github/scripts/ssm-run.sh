#!/usr/bin/env bash
# Usage: ssm-run.sh <script-file>
# Sends the file's contents to the instance via SSM (AWS-RunShellScript), waits for a
# terminal status, prints stdout/stderr, and exits non-zero unless Status == Success.
# Needs: EC2_INSTANCE_ID, AWS_REGION, jq, aws.
set -euo pipefail
script_file="$1"

params=$(jq -n --rawfile s "$script_file" '{commands: [$s], executionTimeout: ["600"]}')
cmd_id=$(aws ssm send-command \
  --region "$AWS_REGION" \
  --instance-ids "$EC2_INSTANCE_ID" \
  --document-name AWS-RunShellScript \
  --comment "GitHub Actions ${GITHUB_WORKFLOW:-manual}" \
  --parameters "$params" \
  --query Command.CommandId --output text)
echo "SSM command id: $cmd_id"

status=""
for _ in $(seq 1 120); do   # up to ~10 min
  sleep 5
  # InvocationDoesNotExist is returned for a few seconds right after send-command;
  # treat any lookup error as "Pending" and keep polling.
  status=$(aws ssm get-command-invocation --region "$AWS_REGION" \
    --command-id "$cmd_id" --instance-id "$EC2_INSTANCE_ID" \
    --query Status --output text 2>/dev/null || echo "Pending")
  echo "status: $status"
  case "$status" in
    Success|Failed|Cancelled|TimedOut|Cancelling) break ;;
  esac
done

inv=$(aws ssm get-command-invocation --region "$AWS_REGION" \
  --command-id "$cmd_id" --instance-id "$EC2_INSTANCE_ID" --output json)
echo "----- stdout -----"
jq -r '.StandardOutputContent' <<<"$inv"
echo "----- stderr -----"
jq -r '.StandardErrorContent' <<<"$inv"

if [ "$status" != "Success" ]; then
  echo "::error::SSM command ended with status '$status'"
  exit 1
fi
