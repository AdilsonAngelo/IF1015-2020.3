var WebSocket = require('ws');
var http = require("http");

wss = new WebSocket.Server({ port: 8080, path: '/chat' });

const now = () => new Date().toLocaleTimeString().slice(0, 5)

http.createServer((req, res) => {
    res.writeHeader(200, {
        "Content-Type": "text/event-stream"
        , "Cache-Control": "no-cache"
        , "Connection": "keep-alive"
        , "Access-Control-Allow-Origin": "*"
    });


    wss.on('connection', ws => {
        var name;
        ws.on('message', message => {
            if (name === undefined) {
                name = JSON.parse(message).name
            } else {
                let pkg = JSON.parse(message)

                wss.clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(pkg));
                    }
                })
                
                res.write(`data: [ ${now()} ] ${pkg.name}: ${pkg.msg}\n\n`);
            }
        });
    });


}).listen(9090);