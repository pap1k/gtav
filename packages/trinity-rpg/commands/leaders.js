const lvls = require("../lvls")
const Fraction = require("../db_models/Fraction")
module.exports = {
obj: [
    {
        triggers: ["leaders"],
        lvl: lvls.PLAYER,
        execute: async player => {
            const fracts = await Fraction.find()
            fracts.forEach(f => {
                player.outputChatBox(`IDX: ${f.idx} ${f.name}`)
            })
        }
    }   
]
}