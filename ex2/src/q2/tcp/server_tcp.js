const net = require('net')
const config = require('../config')
const calculator = require('../calculator')

server = net.createServer((socket) => {
    socket.on('data', payload => {
        try {
            data = JSON.parse(payload)
            op = calculator.getOp(data['op'])
            res = op(data['param1'], data['param2'])
            socket.write(JSON.stringify(res))
        }
        catch (err) {
            socket.write(JSON.stringify({ error: err }))
        }
    })
})

server.listen(config.PORT, config.HOST, () => console.log(`TCP calculator server listening on ${config.HOST}:${config.PORT}`))