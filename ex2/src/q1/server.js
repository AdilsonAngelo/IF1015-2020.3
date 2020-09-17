const dgram = require('dgram')
const readline = require('readline')
const config = require('./config.js')
const color = require('./colors.js').color

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function console_out(msg) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(msg)
    rl.prompt(true)
}

const socket = dgram.createSocket('udp4')

var CLIENT = undefined

socket.on('error', err => {
    console.error(err)
    socket.close()
})

socket.on('listening', () => {
    let address = socket.address();
    msg = color(`Server listening on `, 'magenta_bg+bold+black')
        + color(`${address.address}:${address.port}`, 'magenta_bg+bold+white')
    console_out(msg)
})

socket.on('message', (msg, rinfo) => {
    console_out(msg.toString())
    if (CLIENT === undefined) {
        CLIENT = rinfo
        rl.on('line', line => {
            let nick = color('SERVER', 'magenta+bold')
            let stamp = color(config.timestamp(), 'yellow')
            msg = `${stamp} ${nick}: ${line}`
            socket.send(msg, CLIENT.port, CLIENT.address)
            console_out(msg)
        })
    }
})

socket.bind(config.PORT, config.HOST)