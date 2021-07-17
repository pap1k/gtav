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
        type: Object,
        required: true
    },
    leader: {
        type: Number
    }
})

module.exports = model('Fraction', schema)