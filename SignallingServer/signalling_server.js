
const HttpsServer = require('https').createServer;
const fs = require("fs");
const WebSocket = require('ws');

server = HttpsServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/cert.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/www.chop.click/privkey.pem')
})
socket = new WebSocket.Server({
    server: server
})


socket.broadcast = (ws, data) => {
    socket.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
            console.log('send data')
        }
    });
};

socket.on('connection', ws => {
    console.log(`Client connected. Total connected clients: ${socket.clients.size}`);

    ws.on('message', message => {   
        console.log(message + "\n\n");       
        socket.broadcast(ws, message);        
                 
    });
    ws.on('close', ws=> {
        console.log(`Client disconnected. Total connected clients: ${socket.clients.size}`);
    })

    ws.on('error', error => {
        console.log(`Client error. Total connected clients: ${socket.clients.size}`);
    });
});

server.listen(4444);
