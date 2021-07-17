const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils")
const Fraction = require("../db_models/Fraction")
module.exports = {
obj: [
    {
        triggers: ["leaders"],
        lvl: lvls.PLAYER,
        execute: async player => {
            const fracts = await Fraction.find()
            player.outputChatBox("Фракции: ")
            let lead = "no"
            fracts.forEach(f => {
                if(f.leader){
                    lead = findPlayerByIdOrNickname(f.leader)
                    if(lead && lead.length == undefined)
                        lead = lead.name
                }
                player.outputChatBox(`IDX: ${f.idx} ${f.name} Лидер: ${(lead != "no" ? lead : "offline")}`)
            })
        }
    }   
]
}