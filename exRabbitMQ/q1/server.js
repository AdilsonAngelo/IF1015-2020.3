const { v4: uuid4 } = require('uuid');
const WebSocketServer = require('ws').Server;
const amqp = require('amqplib/callback_api');

var REQUESTS = {};

const requests_interface = {
    'list': () => {
        let res = []
        for (let key in REQUESTS) {
            res.push({ '_id': key, 'request': REQUESTS[key] })
        }
        return res
    },
    'authorize': (_id) => {
        delete REQUESTS[_id]
    }
}

wss = new WebSocketServer({ port: 8080, path: '/requests' });


wss.on('connection', function (ws) {
    ws.on('message', function (message) {

        body = JSON.parse(message);

        if ('function' in body && body.function in requests_interface) {

        }

        console.log(body);
    });
});

amqp.connect('amqp://localhost', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'request_queue';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.consume(queue, function (msg) {

            
            channel.ack(msg);
        }, {
            noAck: false
        });
    });
});