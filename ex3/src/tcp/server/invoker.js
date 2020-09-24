const net = require('net')
const Marshaller = require('../../marshaller')
const invocationHandler = require('./invocationHandler')
const config = require('../../config')


class ServerInvoker {
    static listen() {
        var server = net.createServer((socket) => {
            socket.on('data', payload => {
                var data = Marshaller.unmarshall(payload)
                socket.write(Marshaller.marshall(invocationHandler(data)))
                socket.end()
            })
        })
        server.on('close', () => {
            console.log('Socket closed')
        })
        server.on('error', (err) => {
            console.error(err)
        })
        server.on('listening', () => console.log(`SERVER LISTENING ON ${config.HOST}:${config.PORT}`))

        server.listen(config.PORT, config.HOST)
    }
}

module.exports = ServerInvoker