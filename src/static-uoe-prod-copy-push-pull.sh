#!/bin/bash
cp -r  ./dist/* ~/sources/static-uoe-prod/book/
(cd ~/sources/static-uoe-prod && git add ./book && git commit -m 'update book' --no-verify)
(cd ~/sources/static-uoe-prod && git push origin main) #separate to ensure we push (useful when fixing this script and commit is not needed)
(cd ~/sources/gce-develop/playbooks && ansible-playbook  ./pull-static-repo.yml)

