const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    vehType:{
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    spawned: {
        type: Boolean,
        required: true,
    },
    spawn: {
        type: Object
    }
})

module.exports = model('Vehicle', schema)