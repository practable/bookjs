#!/bin/bash
cp -r  ./dist ~/sources/static-uoe-prod/book/
(cd ~/sources/static-uoe-prod && git add ./book && git commit -m 'update book' --no-verify)
(cd ~/sources/gce-develop/playbooks && ansible-playbook  ./pull-static-repo.yml)

