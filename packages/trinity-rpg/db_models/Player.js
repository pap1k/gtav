const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    rgid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    player_level: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 1,
    }
})

module.exports = model('Player', schema)