const Fraction = require("../db_models/Fraction")
let fractions = await Fraction.find()

function getById(id){
    fractions.forEach(f => {
        if(f.idx == id)
            return f
    })
}

module.exports = {getById}