class Marshaller {
    static marshall(data) {
        let dataString = JSON.stringify(data)
        let payload = Buffer.from(dataString, 'utf8')
        return payload
    }

    static unmarshall(buffer) {
        let dataString = buffer.toString('utf8')
        let data = JSON.parse(dataString)
        return data
    }
}

module.exports = Marshaller