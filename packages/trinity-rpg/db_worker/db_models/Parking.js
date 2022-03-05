const {Schema, model} = require("mongoose")
const schema = new Schema({
    fraction: {
        type: Number,
        default: -1
    },
    coords: {
        type: Object,
        required: true
    },
    carid: {
        type: String,
        default: "none"
    }
})

module.exports = model('Parking', schema)