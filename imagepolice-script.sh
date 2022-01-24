curl -sL https://rpm.nodesource.com/setup_17.x | bash -
yum install nodejs;
mkdir tls;
#git clone ...
#make CA key
openssl genrsa -out tls/ca.key 2048;
#make ca csr
openssl req -new -key tls/ca.key -subj "/CN=CA" -out tls/ca.csr;
#sign CA cer
openssl x509 -req -in tls/ca.csr -signkey tls/ca.key -out tls/ca.crt;


openssl genrsa -out tls/imagepolice-server.key 2048;
#generate client.csr
openssl req -new -key tls/imagepolice-server.key -subj "/CN=localhost" -out tls/imagepolice-server.csr;



openssl x509 -req -in tls/imagepolice-server.csr -CAkey tls/ca.key  -CA tls/ca.crt  -CAcreateserial -out tls/imagepolice-server.crt;


#generate client.key
openssl genrsa -out tls/api-server.key 2048;
#generate client.csr
openssl req -new -key tls/api-server.key -subj "/CN=api-server" -out tls/api-server.csr;
#generate client.crt
openssl x509 -req -in tls/api-server.csr -CAkey tls/ca.key  -CA tls/ca.crt  -out tls/api-server.crt;





