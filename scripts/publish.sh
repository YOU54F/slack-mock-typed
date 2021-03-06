#!/bin/bash -e

VERSION=$(grep '\"version\"' package.json | grep -E -o "([0-9\.]+(-[a-z\.0-9]+)?)")
echo "--> Releasing version ${VERSION}"
echo "    Publishing slack-mock-typed@${VERSION}..."
npm publish --tag latest
echo "    done!"