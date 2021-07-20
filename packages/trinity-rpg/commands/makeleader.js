const lvls = require("../lvls")
const fractions = require("../db_worker/fractions")
const players = require("../db_worker/players")
const {sendToAdmins} = require("../utils")
module.exports = {
obj: [
    {
        triggers: ["makeleader"],
        lvl: lvls.ADMIN_LEVEL_4,
        target: true,
        args: 2,
        hint: "/makeleader [id или часть ника] [IDX фракции]",
        execute: async (player, _, targ, idx)=> {
            if(isNaN(idx) || isNaN(parseInt(idx)))
                return player.outputChatBox("IDX должен быть числом: ")

            idx = parseInt(idx)
            const fract = await fractions.getByIdx(idx)

            if(!fract)
                return player.outputChatBox("Не найдена такая фракция")

            fractions.update(idx, {leader: targ.getVariable('uid')})
            players.updateCustomByUid(targ, { fraction: idx })
            targ.setVariable('fraction', idx)

            sendToAdmins(`Администратор ${player.name} назначил ${targ.name} лидером ${fract.name}`)
            targ.outputChatBox(`Администратор ${player.name} назначил вас лидером ${fract.name}`)
        }
    }   
]
}