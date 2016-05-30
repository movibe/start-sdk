#!/usr/bin/env bash
git add .
git commit -m "Fix SDK"
gulp tag
git push origin --tags
