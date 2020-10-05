const config = require('./config')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('calc.proto', {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const calcPkg = grpcObj.calculatorPackage


const client = new calcPkg.Calculator(`${config.HOST}:${config.PORT}`, grpc.credentials.createInsecure())

client.div({
    param1: 13,
    param2: 0
}, (err, res) => {
    if (err)
        console.error(err)
    else
        console.log(JSON.stringify(res.response))
})