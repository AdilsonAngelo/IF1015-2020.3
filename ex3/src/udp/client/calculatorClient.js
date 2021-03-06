const invoker = require('./invoker')

class CalculatorClient {
    static add(a, b, callback) {
        invoker.send_receive({
            op: 'add',
            param1: a,
            param2: b
        }, callback)
    }
    static sub(a, b, callback) {
        invoker.send_receive({
            op: 'sub',
            param1: a,
            param2: b
        }, callback)
    }
    static mul(a, b, callback) {
        invoker.send_receive({
            op: 'mul',
            param1: a,
            param2: b
        }, callback)
    }
    static div(a, b, callback) {
        invoker.send_receive({
            op: 'div',
            param1: a,
            param2: b
        }, callback)
    }
}

module.exports = CalculatorClient