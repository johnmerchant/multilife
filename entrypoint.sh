#!/bin/sh

rm -rf /client
cp -R /app/dist/client/* /client
node /app/dist/server/server/index.js
