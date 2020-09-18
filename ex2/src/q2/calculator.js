exports.getOp = (op) => {
    switch (op) {
        case 'add':
            return (a, b) => ({ result: a + b, error: null })
            break

        case 'sub':
            return (a, b) => ({ result: a - b, error: null })
            break

        case 'mul':
            return (a, b) => ({ result: a * b, error: null })
            break

        case 'div':
            return (a, b) => ({ result: a / b, error: null })
            break

        default:
            return () => ({ result: null, error: `OPERATION NOT FOUND: ${op}` })
            break
    }
}