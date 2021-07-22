const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    vehType:{
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    spawn: {
        type: Array
    }
})

module.exports = model('Vehicle', schema)