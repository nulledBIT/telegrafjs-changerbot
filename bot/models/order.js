
const { Schema } = require('mongoose');
// const moment = require('moment');
// const dateNow = moment().format('HH:MM DD.MM');

const order = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    btcWallet: {
        type: String,
        required: true
    },
    btcSum: {
        type: Number,
        required: true
    },
    rubSum: {
        type: Number,
        required: true
    },
    received: {
        type: Date,
        default: new Date()
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    chatId: {
        type: Number,
        required: true
    }
});

module.exports = order;