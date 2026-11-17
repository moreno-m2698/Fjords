#!/bin/bash
# Fjords EC2 bootstrap (Amazon Linux 2023, arm64). Idempotent.
set -euxo pipefail

# Docker
rpm -q docker >/dev/null 2>&1 || dnf install -y docker
systemctl enable --now docker

# 1 GB swap
if [ ! -f /swapfile ]; then
  dd if=/dev/zero of=/swapfile bs=1M count=1024
  chmod 600 /swapfile
  mkswap /swapfile
fi
swapon --show=NAME --noheadings | grep -q '^/swapfile$' || swapon /swapfile
grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Docker log rotation
mkdir -p /etc/docker
cat > /etc/docker/daemon.json <<'JSON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
JSON
systemctl restart docker
