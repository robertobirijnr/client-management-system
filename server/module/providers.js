const mongoose = require('mongoose')


const providerSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Provider', providerSchema)