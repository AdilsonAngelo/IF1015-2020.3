const net = require('net')
const Marshaller = require('../../marshaller')
const config = require('../../config')

class ClientInvoker {

    static send_receive(data, callback) {
        var socket = new net.Socket()
        socket.on('data', data => {
            callback(Marshaller.unmarshall(data))
            socket.destroy()
        })
        socket.connect(config.PORT, config.HOST, () => {
            socket.write(Marshaller.marshall(data))
        })
    }
}

module.exports = ClientInvoker