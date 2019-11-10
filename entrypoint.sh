#!/bin/sh

certbot --nginx
pm2 start process.yml