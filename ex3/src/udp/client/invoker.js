const dgram = require('dgram')
const config = require('../../config.js')
const Marshaller = require('../../marshaller')


class ClientInvoker {
    static send_receive(data, callback) {
        var client = dgram.createSocket('udp4')
        client.send(Marshaller.marshall(data), config.PORT, config.HOST)

        client.on('message', (payload, rinfo) => {
            callback(Marshaller.unmarshall(payload))
        })
    }
}

module.exports = ClientInvoker