const {Schema, model} = require("mongoose")
const ssconf = require("../../server-side-conf.json")
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
    },
    fraction: {
        type: Number,
        default: 0
    },
    spawn: {
        type: Object,
        default: ssconf.global_spawn
    }
})

module.exports = model('Player', schema)