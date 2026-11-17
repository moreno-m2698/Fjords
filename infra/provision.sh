#!/usr/bin/env bash
# Provision Fjords AWS infrastructure (us-east-2). Safe to re-run.
set -euo pipefail
export MSYS_NO_PATHCONV=1 AWS_PAGER=""

R=us-east-2
ACCT=941202158343
REPO_GH=moreno-m2698/Fjords
DIR="$(cd "$(dirname "$0")" && pwd)"
# Native Windows aws.exe cannot read MSYS paths; convert to mixed form when cygpath exists.
wp() { if command -v cygpath >/dev/null 2>&1; then cygpath -m "$1"; else echo "$1"; fi; }
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
aws() { command aws --region "$R" "$@"; }
iam() { command aws iam "$@"; }
log() { echo "==> $*"; }

[ "$(command aws sts get-caller-identity --query Account --output text)" = "$ACCT" ] || { echo "wrong account"; exit 1; }

# ---- ECR ----
log "ECR repository"
aws ecr describe-repositories --repository-names fjords >/dev/null 2>&1 || \
  aws ecr create-repository --repository-name fjords >/dev/null
ECR_ARN=$(aws ecr describe-repositories --repository-names fjords --query 'repositories[0].repositoryArn' --output text)
cat > "$TMP/lc.json" <<'J'
{"rules":[{"rulePriority":1,"description":"keep last 5 images","selection":{"tagStatus":"any","countType":"imageCountMoreThan","countNumber":5},"action":{"type":"expire"}}]}
J
aws ecr put-lifecycle-policy --repository-name fjords --lifecycle-policy-text "file://$(wp "$TMP")/lc.json" >/dev/null

# ---- OIDC provider ----
log "GitHub OIDC provider"
OIDC_ARN="arn:aws:iam::$ACCT:oidc-provider/token.actions.githubusercontent.com"
if ! iam get-open-id-connect-provider --open-id-connect-provider-arn "$OIDC_ARN" >/dev/null 2>&1; then
  iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 >/dev/null
fi

# ---- EC2 role + instance profile ----
log "IAM role fjords-ec2"
cat > "$TMP/ec2-trust.json" <<'J'
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}
J
iam get-role --role-name fjords-ec2 >/dev/null 2>&1 || \
  iam create-role --role-name fjords-ec2 --assume-role-policy-document "file://$(wp "$TMP")/ec2-trust.json" >/dev/null
for p in AmazonSSMManagedInstanceCore AmazonEC2ContainerRegistryReadOnly; do
  iam attach-role-policy --role-name fjords-ec2 --policy-arn "arn:aws:iam::aws:policy/$p"
done
cat > "$TMP/ec2-inline.json" <<J
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"ssm:GetParameter","Resource":"arn:aws:ssm:$R:$ACCT:parameter/fjords/*"}]}
J
iam put-role-policy --role-name fjords-ec2 --policy-name fjords-ssm-params --policy-document "file://$(wp "$TMP")/ec2-inline.json"
if ! iam get-instance-profile --instance-profile-name fjords-ec2 >/dev/null 2>&1; then
  iam create-instance-profile --instance-profile-name fjords-ec2 >/dev/null
  iam add-role-to-instance-profile --instance-profile-name fjords-ec2 --role-name fjords-ec2
  log "waiting for instance profile propagation"; sleep 15
fi

# ---- Network ----
VPC=$(aws ec2 describe-vpcs --filters Name=isDefault,Values=true --query 'Vpcs[0].VpcId' --output text)
log "Default VPC $VPC"
# The default VPC may have had its default subnets deleted; recreate them if missing.
for az in ${R}a ${R}b ${R}c; do
  n=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC Name=availability-zone,Values=$az --query 'length(Subnets)' --output text)
  if [ "$n" = "0" ]; then log "creating default subnet in $az"; aws ec2 create-default-subnet --availability-zone "$az" >/dev/null || true; fi
done

# The default VPC may also have lost its internet gateway (the 0.0.0.0/0 route then shows "blackhole").
IGW=$(aws ec2 describe-internet-gateways --filters Name=attachment.vpc-id,Values=$VPC --query 'InternetGateways[0].InternetGatewayId' --output text)
if [ "$IGW" = "None" ]; then
  log "attaching a new internet gateway to $VPC"
  IGW=$(aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=default-vpc-igw}]' \
    --query InternetGateway.InternetGatewayId --output text)
  aws ec2 attach-internet-gateway --internet-gateway-id "$IGW" --vpc-id "$VPC"
fi
MAIN_RTB=$(aws ec2 describe-route-tables --filters Name=vpc-id,Values=$VPC Name=association.main,Values=true --query 'RouteTables[0].RouteTableId' --output text)
DEF_GW=$(aws ec2 describe-route-tables --route-table-ids "$MAIN_RTB" --query "RouteTables[0].Routes[?DestinationCidrBlock=='0.0.0.0/0'].GatewayId | [0]" --output text)
if [ "$DEF_GW" = "None" ]; then
  aws ec2 create-route --route-table-id "$MAIN_RTB" --destination-cidr-block 0.0.0.0/0 --gateway-id "$IGW" >/dev/null
elif [ "$DEF_GW" != "$IGW" ]; then
  aws ec2 replace-route --route-table-id "$MAIN_RTB" --destination-cidr-block 0.0.0.0/0 --gateway-id "$IGW"
fi

log "Security group fjords-web"
SG=$(aws ec2 describe-security-groups --filters Name=group-name,Values=fjords-web Name=vpc-id,Values=$VPC --query 'SecurityGroups[0].GroupId' --output text)
if [ "$SG" = "None" ]; then
  SG=$(aws ec2 create-security-group --group-name fjords-web --description "Fjords web (HTTP only)" --vpc-id "$VPC" \
    --tag-specifications 'ResourceType=security-group,Tags=[{Key=Name,Value=fjords-web}]' --query GroupId --output text)
  aws ec2 authorize-security-group-ingress --group-id "$SG" --ip-permissions \
    'IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges=[{CidrIp=0.0.0.0/0}],Ipv6Ranges=[{CidrIpv6=::/0}]' >/dev/null
fi

# ---- EC2 instance (Spot, persistent, stop on interruption; never falls back to on-demand) ----
log "EC2 instance"
IID=$(aws ec2 describe-instances --filters Name=tag:Name,Values=fjords Name=instance-state-name,Values=pending,running,stopping,stopped \
  --query 'Reservations[].Instances[].InstanceId | [0]' --output text)
if [ "$IID" = "None" ]; then
  AMI=$(aws ssm get-parameter --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-arm64 --query Parameter.Value --output text)
  for az in ${R}a ${R}b ${R}c; do
    SUBNET=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC Name=availability-zone,Values=$az --query 'Subnets[0].SubnetId' --output text)
    log "launching spot t4g.micro in $az ($SUBNET, $AMI)"
    if IID=$(aws ec2 run-instances --image-id "$AMI" --instance-type t4g.micro --subnet-id "$SUBNET" \
      --security-group-ids "$SG" --iam-instance-profile Name=fjords-ec2 \
      --instance-market-options 'MarketType=spot,SpotOptions={SpotInstanceType=persistent,InstanceInterruptionBehavior=stop}' \
      --block-device-mappings 'DeviceName=/dev/xvda,Ebs={VolumeSize=8,VolumeType=gp3,DeleteOnTermination=true}' \
      --metadata-options 'HttpTokens=required,HttpPutResponseHopLimit=2,HttpEndpoint=enabled' \
      --user-data "file://$(wp "$DIR")/user-data.sh" \
      --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=fjords}]' 'ResourceType=volume,Tags=[{Key=Name,Value=fjords}]' \
      --query 'Instances[0].InstanceId' --output text); then break; fi
    IID=""
    log "launch failed in $az"
  done
  [ -n "$IID" ] || { echo "Spot launch failed in all AZs; NOT falling back to on-demand."; exit 1; }
fi
log "Instance $IID"
aws ec2 wait instance-running --instance-ids "$IID"

# ---- Elastic IP ----
log "Elastic IP"
ALLOC=$(aws ec2 describe-addresses --filters Name=tag:Name,Values=fjords --query 'Addresses[0].AllocationId' --output text)
if [ -z "$ALLOC" ] || [ "$ALLOC" = "None" ]; then
  ALLOC=$(aws ec2 allocate-address --domain vpc --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=fjords}]' --query 'AllocationId' --output text)
fi
EIP=$(aws ec2 describe-addresses --allocation-ids "$ALLOC" --query 'Addresses[0].PublicIp' --output text)
CUR=$(aws ec2 describe-addresses --allocation-ids "$ALLOC" --query 'Addresses[0].InstanceId' --output text)
[ "$CUR" = "$IID" ] || aws ec2 associate-address --allocation-id "$ALLOC" --instance-id "$IID" --allow-reassociation >/dev/null

# ---- GitHub deploy role ----
log "IAM role fjords-gha-deploy"
cat > "$TMP/gha-trust.json" <<J
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Federated":"$OIDC_ARN"},"Action":"sts:AssumeRoleWithWebIdentity","Condition":{"StringEquals":{"token.actions.githubusercontent.com:aud":"sts.amazonaws.com","token.actions.githubusercontent.com:sub":"repo:$REPO_GH:environment:prod"}}}]}
J
if iam get-role --role-name fjords-gha-deploy >/dev/null 2>&1; then
  iam update-assume-role-policy --role-name fjords-gha-deploy --policy-document "file://$(wp "$TMP")/gha-trust.json"
else
  iam create-role --role-name fjords-gha-deploy --assume-role-policy-document "file://$(wp "$TMP")/gha-trust.json" >/dev/null
fi
cat > "$TMP/gha-inline.json" <<J
{"Version":"2012-10-17","Statement":[
{"Effect":"Allow","Action":"ecr:GetAuthorizationToken","Resource":"*"},
{"Effect":"Allow","Action":["ecr:BatchCheckLayerAvailability","ecr:InitiateLayerUpload","ecr:UploadLayerPart","ecr:CompleteLayerUpload","ecr:PutImage","ecr:BatchGetImage","ecr:GetDownloadUrlForLayer"],"Resource":"$ECR_ARN"},
{"Effect":"Allow","Action":"ssm:SendCommand","Resource":["arn:aws:ec2:$R:$ACCT:instance/$IID","arn:aws:ssm:$R::document/AWS-RunShellScript"]},
{"Effect":"Allow","Action":["ssm:GetCommandInvocation","ssm:ListCommandInvocations"],"Resource":"*"},
{"Effect":"Allow","Action":["ssm:PutParameter","ssm:GetParameter"],"Resource":"arn:aws:ssm:$R:$ACCT:parameter/fjords/*"}]}
J
iam put-role-policy --role-name fjords-gha-deploy --policy-name fjords-deploy --policy-document "file://$(wp "$TMP")/gha-inline.json"
ROLE_ARN=$(iam get-role --role-name fjords-gha-deploy --query Role.Arn --output text)

# ---- GitHub repo variables ----
log "GitHub variables"
gh variable set AWS_ROLE_ARN --body "$ROLE_ARN" --repo $REPO_GH
gh variable set AWS_REGION --body "$R" --repo $REPO_GH
gh variable set ECR_REPOSITORY --body fjords --repo $REPO_GH
gh variable set EC2_INSTANCE_ID --body "$IID" --repo $REPO_GH
gh variable set EC2_PUBLIC_IP --body "$EIP" --repo $REPO_GH

cat <<S

================ Fjords infra summary ================
Region          : $R
ECR repo        : $ECR_ARN
OIDC provider   : $OIDC_ARN
Deploy role     : $ROLE_ARN
EC2 role/profile: fjords-ec2
Security group  : $SG ($VPC)
Instance        : $IID
Elastic IP      : $EIP ($ALLOC)
======================================================
S
