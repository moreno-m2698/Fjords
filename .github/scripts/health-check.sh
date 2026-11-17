#!/usr/bin/env bash
# Usage: health-check.sh
# Polls the app until / and /api/asset/champion/Ahri return 200 (~4 min max each).
# On failure, dumps the container logs through SSM and exits 1.
# Needs: EC2_PUBLIC_IP, EC2_INSTANCE_ID, AWS_REGION.
set -uo pipefail
base="http://${EC2_PUBLIC_IP}"

wait_for_200() {
  local url="$1" code=000
  for _ in $(seq 1 48); do   # 48 x 5s = 4 min
    code=$(curl -s -o /dev/null -m 5 -w '%{http_code}' "$url" || true)
    echo "GET $url -> $code"
    [ "$code" = "200" ] && return 0
    sleep 5
  done
  return 1
}

if wait_for_200 "$base/" && wait_for_200 "$base/api/asset/champion/Ahri"; then
  echo "Health check passed"
  exit 0
fi

echo "::error::Health check failed; fetching container logs"
tmp=$(mktemp)
echo 'docker logs --tail 200 fjords 2>&1 || true' > "$tmp"
bash "$(dirname "$0")/ssm-run.sh" "$tmp" || true
exit 1
