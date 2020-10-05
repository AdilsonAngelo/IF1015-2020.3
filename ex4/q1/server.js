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
    cb(null, { response: call.request.param1 + call.request.param2 })
}
function sub(call, cb) {
    cb(null, { response: call.request.param1 - call.request.param2 })
}
function mul(call, cb) {
    cb(null, { response: call.request.param1 * call.request.param2 })
}
function div(call, cb) {
    if (call.request.param2 === 0) {
        cb({
            code: 400,
            message: "Cannot divide by zero",
            status: grpc.status.INTERNAL
        }, null)
    }
    cb(null, { response: call.request.param1 / call.request.param2 })
}
