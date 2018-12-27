#! /bin/sh

set -e

./node_modules/.bin/vue-cli-service build --target lib --name occubrow-graph-view src/library-entry.ts
npm publish
