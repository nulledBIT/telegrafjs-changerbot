const { Schema, model } = require('mongoose');

const configs = new Schema({
    minOrder: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    paymentCard: {
        type: String,
        required: true
    }
});

module.exports = configs;