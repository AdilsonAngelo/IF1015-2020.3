const dgram = require('dgram')
const readline = require('readline')
const config = require('./config.js')
const color = require('./colors.js').color

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = dgram.createSocket('udp4')

var NAME = undefined

function console_out(msg) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(msg)
    rl.prompt(true)
}

rl.question(color('please state your name:', 'bold+black+yellow_bg') + ' ', (ans) => {
    NAME = ans
    console_out(color(`Welcome ${NAME}!`, 'green'))
})

rl.addListener('line', line => {
    let nick = color(NAME, 'magenta+bold')
    let stamp = color(config.timestamp(), 'yellow')
    msg = `${stamp} ${nick}: ${line}`
    socket.send(msg, config.PORT, config.HOST)
    console_out(msg)
})


socket.on('message', (msg, rinfo) => {
    console_out(msg.toString())
})