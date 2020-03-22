
const fs = require('fs')
const path = require('path')

let test = []
const conf = fs.readFileSync(path.join(__dirname, 'conf.json'), 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    }
    const config = JSON.parse(data)
})

const config = JSON.parse(conf)
module.exports = config


// const config = { COMMISSION: 10, MIN_ORDER_RUB: 500, CARD: '1111 2222 3333 6969' }
