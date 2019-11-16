#!/bin/bash

set -e

COMMIT_SHA1=$CIRCLE_SHA1
export COMMIT_SHA1=$COMMIT_SHA1

envsubst < ./kube/deployment.yml > ./kube/deployment.yml.out
mv ./kube/deployment.yml.out ./kube/deployment.yml

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 -d > cert.crt

./kubectl \
  --kubeconfig=/dev/null \
  --server=$KUBERNETES_SERVER \
  --insecure-skip-tls-verify=true \
  --token=$KUBERNETES_TOKEN \
  apply -f ./kube/