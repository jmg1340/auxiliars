# el certificat caduca en un any
# data generacio: 23/11/2016

openssl genrsa -out aux-2017-key.pem 2048
openssl req -new -sha256 -key aux-2017-key.pem -out aux-2017-csr.pem
openssl x509 -req -in aux-2017-csr.pem -signkey aux-2017-key.pem -out aux-2017-cert.pem
