const config = require('./config')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('calc.proto', {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const calcPkg = grpcObj.calculatorPackage

const server = new grpc.Server()

server.bind(`${config.HOST}:${config.PORT}`, grpc.ServerCredentials.createInsecure())

server.addService(calcPkg.Calculator.service, {
    'add': add,
    'sub': sub,
    'mul': mul,
    'div': div
})

server.start()

function add(call, cb) {
    let param1 = call.request.param1
    let param2 = call.request.param2
    cb(null, { response: param1 + param2 })
}
function sub(call, cb) {
    let param1 = call.request.param1
    let param2 = call.request.param2
    cb(null, { response: param1 - param2 })
}
function mul(call, cb) {
    let param1 = call.request.param1
    let param2 = call.request.param2
    cb(null, { response: param1 * param2 })
}
function div(call, cb) {
    let param1 = call.request.param1
    let param2 = call.request.param2
    if (param2 == 0) {
        cb({
            code: 400,
            message: "Cannot divide by zero",
            status: grpc.status.INTERNAL
        }, null)
    }
    cb(null, { response: param1 / param2 })
}
