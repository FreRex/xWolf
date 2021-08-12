var express = require('express');
var path = require('path');
var fs = require('fs')
var https = require('https')
var app = express()
const port = 4202

//Indirizzamento verso route FRONTEND
app.use('/',express.static(path.join(__dirname, './VideoChatDemo/dist/VideoChatDemo')));
app.use('/*', (req, res) => { res.sendFile(path.join(__dirname, './VideoChatDemo/dist/VideoChatDemo/index.html')); });

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}) */

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/cert.pem')
  }, app)
  
  .listen(port, function () {
    console.log(`https://www.chop.click:${port}`)
  })