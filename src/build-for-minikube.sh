#!/bin/bash
cp .env.production .env.production.tmp
cat << EOF > .env.production
VUE_APP_BOOK_SERVER=https://book.minikube.practable.io
VUE_APP_ASSET_SERVER=https://static.minikube.practable.io
VUE_APP_TOKEN_SERVER=https://token.minikube.practable.io
EOF

echo "Building for minikube"
cat .env.production

npm run build

mv .env.production.tmp .env.production


