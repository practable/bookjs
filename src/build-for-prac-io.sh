#!/bin/bash
cp .env.production .env.production.tmp
cat << EOF > .env.production
VUE_APP_BOOK_SERVER=https://book.prac.io
VUE_APP_ASSET_SERVER=https://static.prac.io
VUE_APP_TOKEN_SERVER=https://token.prac.io
EOF

echo "Building for minikube"
cat .env.production

npm run build

mv .env.production.tmp .env.production


