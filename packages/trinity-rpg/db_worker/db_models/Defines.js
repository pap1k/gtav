const {Schema, model} = require("mongoose")

const schema = new Schema({
    global_spawn: {
        type: Object,
        required: true
    }
})

module.exports = model('Defines', schema)
/*
  x: 63.40483856201172,
  y: -735.594970703125,
  z: 43.68914031982422
*/
