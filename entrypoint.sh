#!/bin/sh

certbot --nginx
service nginx start
pm2 start process.yml
