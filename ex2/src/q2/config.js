exports.PORT = 1917
exports.HOST = 'localhost'

// util
exports.parseExp = (exp) => {
    let rex_exp = /^\s*(?<param1>[+-]?\d+)\s*(?<op>[+\-*/])\s*(?<param2>[+-]?\d+)$/m
    let ops = { '+': 'add', '-': 'sub', '*': 'mul', '/': 'div' }
    let match = exp.match(rex_exp)
    if (match !== null)
        return {
            param1: Number(match.groups.param1),
            param2: Number(match.groups.param2),
            op: ops[match.groups.op]
        }
    else
        return null
}