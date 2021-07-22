const lvls = require("../lvls")
const {findPlayerByUid} = require("../utils")
const fractions = require("../db_worker/fractions")
module.exports = {
obj: [
    {
        triggers: ["leaders"],
        lvl: lvls.PLAYER,
        execute: async player => {
            const fracts = await fractions.getAll()
            player.outputChatBox("Фракции: ")
            let lead
            fracts.forEach(f => {
                lead = "no"
                if(f.leader){
                    lead = findPlayerByUid(f.leader)
                    if(lead)
                        lead = lead.name
                }
                player.outputChatBox(`IDX: ${f.idx} ${f.name} Лидер: ${((lead != "no" && lead) ? lead : "offline")}`)
            })
        }
    }   
]
}