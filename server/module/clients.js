const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    providers: [{
        id: String,
        name: String,

    }]
})

module.exports = mongoose.model('Client', clientSchema)