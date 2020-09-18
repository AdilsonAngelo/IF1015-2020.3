const dgram = require('dgram')
const readline = require('readline')
const config = require('../config.js')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = dgram.createSocket('udp4')

function console_out(msg) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(msg)
    rl.prompt(true)
}

console_out('USAGE:')
console_out('> [NUMBER] [OP] [NUMBER]')
console_out('= [RESULT]')
console_out('WHERE [OP] IS ONE OF { +, -, *, / }')
console_out('')
rl.addListener('line', line => {
    let payload = config.parseExp(line)
    if (payload === null) {
        console_out('INVALID EXPRESSION')
        return
    }
    client.send(JSON.stringify(payload), config.PORT, config.HOST)
    rl.prompt(true)
})

client.on('message', (payload, rinfo) => {
    let res = JSON.parse(payload).result
    console_out(`= ${res}`)
})
