const axios = require('axios')
const { type } = require('os')

var emp = {
    "name": "Adilson Angelo",
    "birthdate": "1995-05-08",
    "company": "Nina",
    "jobTitle": "Developer",
    "salary": "10000000"
}

const HOST = 'localhost'
const PORT = 3000

const URL = `http://${HOST}:${PORT}`

axios({
    method: 'post',
    url: URL + '/employees',
    data: emp,
    headers: {
        'Accept': 'application/json'
    }
}).then(function (response) {
    console.log(response.data)
    let emp = response.data.message
    axios({
        method: 'put',
        url: URL + '/employees/' + emp.id,
        data: { name: 'Saddam Hussein' },
        headers: {
            'Accept': 'application/xml'
        }
    }).then(function (response) {
        console.log(response.data)
    }).catch(function (err) {
        console.error(err.data);
    });
}).catch(function (err) {
    console.error(err.data);
});

setTimeout(() => {
    axios({
        method: 'get',
        url: URL + '/employees',
        headers: {
            'Accept': 'application/xml'
        }
    }).then(function (response) {
        console.log(response.data)
    }).catch(function (err) {
        console.error(err.data);
    });
}, 5000)