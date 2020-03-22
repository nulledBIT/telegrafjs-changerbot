const { Schema, model } = require('mongoose');

const settings = new Schema({
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

module.exports = settings;