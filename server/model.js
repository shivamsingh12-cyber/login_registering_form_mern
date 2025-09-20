const mongoose = require('mongoose')

const schema = mongoose.Schema({
    regEmail:String,
    regPass:String
})

const model = mongoose.model('auth',schema)

module.exports = model;