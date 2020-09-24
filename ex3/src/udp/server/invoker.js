const dgram = require('dgram')
const config = require('../../config')
const Marshaller = require('../../marshaller')
const invocationHandler = require('./invocationHandler')

class ServerInvoker {
    static listen() {
        var server = dgram.createSocket('udp4')

        server.on('listening', () => {
            let address = server.address()
            console.log(
                `SERVER LISTENING ON ${address.address}:${address.port}`
            )
        })
        server.on('message', (payload, rinfo) => {
            let data = Marshaller.unmarshall(payload)
            let res = invocationHandler(data)
            server.send(Marshaller.marshall(res), rinfo.port, rinfo.address)
        })
        server.bind(config.PORT, config.HOST)
    }
}

module.exports = ServerInvoker