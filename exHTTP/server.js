const express = require('express')
const xml = require("xmlbuilder");
const { v4: uuid4 } = require('uuid')
const app = express()
const port = 3000

// API DE CADASTRO DE FUNCIONARIOS


var COMPANIES = {}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function makeResponse(obj, accepts, error) {
    if (Array.isArray(accepts))
        accepts = accepts[0]
    if (['xml', 'text/xml', 'application/xml'].includes(accepts)) {
        console.log(xml.create({ error: error, message: obj }).end())
        return xml.create({ error: error, message: obj }).end()
    }
    else if (['application/json', '*/*'].includes(accepts)) {
        return { error: error, message: obj }
    }
    else {
        return { error: 400, message: `Accept must be JSON or XML. Got: ${accepts}` }
    }
}

var employeeSchema = {
    name: (val) => /^([a-zA-Z] ?)+$/.test(val),
    birthdate: (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
    company: (val) => /^([a-zA-Z0-9] ?)+$/.test(val),
    jobTitle: (val) => /^([a-zA-Z] ?)+$/.test(val),
    salary: (val) => !isNaN(val) && parseFloat(val) == val
}


function validateEmployee(object) {
    var errors = Object.keys(employeeSchema).filter(function (key) {
        return !employeeSchema[key](object[key]);
    }).map(function (key) {
        return new Error(key + " is invalid.");
    });

    if (errors.length > 0) {
        errors.forEach(function (error) {
            console.log(error.message);
        });
        return false
    }
    return true
}

// example employee object
// {
//     "id": "..."
//     "name": "Adilson Angelo",
//     "birthdate": "1995-05-08",
//     "company": "Nina",
//     "jobTitle": "Developer",
//     "salary": "10000000"
// }


app.post('/employees', (req, res) => {

    let emp = req.body

    if (!validateEmployee(emp)) {
        res.status(400).send(makeResponse('Invalid request body!', req.accepts(), 400))
        return
    }

    if (!COMPANIES[emp.company.toUpperCase()]) {
        console.log(COMPANIES)
        COMPANIES[emp.company.toUpperCase()] = []
    }

    emp.id = uuid4()

    COMPANIES[emp.company.toUpperCase()].push(emp)

    console.log()
    res.send(makeResponse(emp, req.accepts(), null))
})

app.get('/employees/:id', (req, res) => {
    console.log(req.params.id)
    for (let k in COMPANIES) {
        console.log(k)
        for (let emp of COMPANIES[k]) {
            console.log(emp)
            if (emp.id == req.params.id) {
                res.send(makeResponse(emp, req.accepts(), null))
            }
        }
    }

    res.status(404).send(makeResponse('Employee not found!', req.accepts(), 404))
})

app.put('/employees/:id', (req, res) => {
    let emp = req.body
    let id = req.params.id

    for (let key in emp) {
        if (Object.keys(employeeSchema).indexOf(key) == -1) {
            res.status(400).send(makeResponse('Invalid request body!', req.accepts(), 400))
            return
        }
        if (!employeeSchema[key](emp[key])) {
            res.status(400).send(makeResponse('Invalid request body!', req.accepts(), 400))
            return
        }
    }

    for (let co in COMPANIES) {
        for (let employee of COMPANIES[co]) {
            if (employee.id === id) {
                for (let key in emp) {
                    employee[key] = emp[key]
                }
                res.send(makeResponse(employee, req.accepts(), null))
                return
            }
        }
    }
    res.status(404).send(makeResponse('Employee not found!', req.accepts(), 404))
})

app.delete('/employees/:id', (req, res) => {
    let id = req.params.id

    for (let co in COMPANIES) {
        for (let i = 0; i < COMPANIES[co].length; i++) {
            if (COMPANIES[co][i].id === id) {
                COMPANIES[co].splice(i, 1);
                res.send(makeResponse('Employee deleted!', req.accepts(), null))
                return
            }
        }
    }
    res.status(404).send(makeResponse('Employee not found!', req.accepts(), 404))
})

app.get('/employees', (req, res) => {
    res.send(makeResponse(COMPANIES, req.accepts(), null))
})

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})

