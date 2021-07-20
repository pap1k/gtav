const Fraction = require("../db_worker/db_models/Fraction")
let fractions = Fraction.find()

function getById(id){
    fractions.forEach(f => {
        if(f.idx == id)
            return f
    })
}

module.exports = {getById}