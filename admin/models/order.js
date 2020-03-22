
const { Schema, model } = require('mongoose');


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
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true
    },
    chatId: {
        type: Number,
        required: true
    }
});

module.exports = order;