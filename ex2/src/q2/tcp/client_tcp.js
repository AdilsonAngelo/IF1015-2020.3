const { match } = require('assert')
const net = require('net')
const readline = require('readline')
const config = require('../config')

const client = new net.Socket()

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

client.on('close', err => {
    console_out('CONNECTION LOST')
    console.error(`ERROR: ${err}`)
    client.destroy()
    rl.close()
    rl.removeAllListeners()
})

console_out('USAGE:')
console_out('> [NUMBER] [OP] [NUMBER]')
console_out('= [RESULT]')
console_out('WHERE [OP] IS ONE OF { +, -, *, / }')
console_out('')
client.connect(config.PORT, config.HOST, () => {
    rl.addListener('line', line => {
        let payload = config.parseExp(line)
        if (payload === null) {
            console_out('INVALID EXPRESSION')
            return
        }
        client.write(JSON.stringify(payload))
        rl.prompt(true)
    })
    client.on('data', payload => {
        data = JSON.parse(payload)
        console_out(`= ${data.result}`)
    })
})