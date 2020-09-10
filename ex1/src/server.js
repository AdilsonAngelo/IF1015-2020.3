const net = require('net')
const readline = require('readline')
const color = require("ansi-color").set

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const PORT = 1917
const HOST = '0.0.0.0'
const timestamp = () => `[${new Date().toLocaleTimeString()}]`

var clients = []

function broadcast(msg) {
    clients.forEach((client) => {
        client.write(msg)
    })
}

const server = net.createServer((socket) => {
    clients.push(socket)
    var name = undefined
    socket.write(color('please state your name:', 'bold+black+yellow_bg'))

    socket.on('data', payload => {
        data = payload.toString()

        if (name === undefined) {
            name = data
            broadcast(
                color(name, 'yellow') + color(` has joined the chat`, 'green')
            )
        }
        else {
            let nick = color(name, 'red')
            let stamp = color(timestamp(), 'cyan')
            broadcast(`${stamp} ${nick}: ${data}`)
        }
    })

    rl.addListener('line', line => {
        socket.write(line)
    })

    socket.on('end', () => {
        clients.splice(clients.indexOf(socket), 1)
        broadcast(
            color(name, 'yellow') + color(` has left the chat`, 'red')
        )
    })
})

server.listen(PORT, HOST, () => console.log(`server listening on port: ${PORT}`))