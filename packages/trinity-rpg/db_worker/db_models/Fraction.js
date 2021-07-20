const {Schema, model} = require("mongoose")

const schema = new Schema({
    idx: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    players: {
        type: Array
    },
    leader: {
        type: String
    },
    spawnpoints: {
        type: Array,
        required: true
    },
    duty:{
        type: Object
    }
})

module.exports = model('Fraction', schema)