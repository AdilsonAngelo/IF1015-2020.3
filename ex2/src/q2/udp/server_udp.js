const dgram = require('dgram')
const config = require('../config')
const calculator = require('../calculator')

const server = dgram.createSocket('udp4')

server.on('listening', () => {
    let address = server.address()
    console.log(
        `UDP calculator server listening on ${address.address}:${address.port}`
    )
})

server.on('message', (payload, rinfo) => {
    try {
        console.log(JSON.parse(payload))
        data = JSON.parse(payload)
        op = calculator.getOp(data['op'])
        res = op(data['param1'], data['param2'])
        server.send(JSON.stringify(res), rinfo.port, rinfo.address)
    }
    catch (err){
        server.send(JSON.stringify({error: err}), rinfo.port, rinfo.address)
    }
})

server.bind(config.PORT, config.HOST)
