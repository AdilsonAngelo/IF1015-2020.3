const net = require('net')
const readline = require('readline')

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

client.connect(1917, 'localhost', () => {
    rl.addListener('line', line => {
        client.write(line)
        rl.prompt(true)
    })
    client.on('data', payload => {
        data = payload.toString()
        console_out(data)
    })
})