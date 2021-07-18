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
        type: Object
    },
    leader: {
        type: Number
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