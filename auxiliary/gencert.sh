#! /usr/bin/sh

openssl genrsa -out dev-key.pem 2048
openssl req -new -key dev-key.pem -out dev.csr
openssl x509 -req -in dev.csr -signkey dev-key.pem -out dev-cert.pem
rm dev.csr
