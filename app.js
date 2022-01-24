const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
 console.log(req.client);
  if (!req.client.authorized) {
  return res.send('Unauthorised\n');
  }
  if (req.client.authorized){
   return res.send("This user is auth\n");
  }
});


app.post('/policy', (req, res) => {
  if (!req.client.authorized) {
  return res.send('Unauthorised\n');
  }
  if (req.client.authorized){


     let req_body = JSON.stringify (req.body);

   return res.send("This user is auth\n");
  }
});


https
  .createServer(
    {
      // ...
      cert: fs.readFileSync('tls/imagepolice-server.crt'),
      key: fs.readFileSync('tls/imagepolice-server.key'),
      ca: [fs.readFileSync('tls/ca.crt')] ,
  requestCert: true,
  // As specified as "true", so no unauthenticated traffic
  // will make it to the specified route specified
  rejectUnauthorized: false
      // ...
    },
    app
  )
  .listen(3000);



// {"apiVersion":"imagepolicy.k8s.io/v1alpha1","kind":"ImageReview","spec":{"containers":[{"image":"myrepo/myimage:v1"},{"image":"myrepo/myimage@sha256:beb6bd6a68f114c1dc2ea4b28db81bdf91de202a9014972bec5e4d9171d90ed"}],"annotations":{"mycluster.image-policy.k8s.io/ticket-1234": "break-glass"},"namespace":"mynamespace"}}
