const CalculatorClient = require("./calculatorClient");

const calculator = require('./calculatorClient')

var interval = setInterval(() => {
    calculator.add(1, 2, res => console.log(`RESULTADO: ${res}`))
    calculator.sub(2, 1, res => console.log(`RESULTADO: ${res}`))
    calculator.mul(4, 5, res => console.log(`RESULTADO: ${res}`))
    calculator.div(144, 12, res => console.log(`RESULTADO: ${res}`))
}, 1000)


setTimeout(() => clearInterval(interval), 60000)