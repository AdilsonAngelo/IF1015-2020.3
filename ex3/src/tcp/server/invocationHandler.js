const calculator = require('../../calculator')

function invocationHandler(inv) {
    switch (inv.op) {
        case 'add':
            return calculator.add(inv.param1, inv.param2)
            break;

        case 'sub':
            return calculator.sub(inv.param1, inv.param2)
            break;

        case 'mul':
            return calculator.mul(inv.param1, inv.param2)
            break;

        case 'div':
            return calculator.div(inv.param1, inv.param2)
            break;

        default:
            return null
            break;
    }
}


module.exports = invocationHandler