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
            const f = await fractions.getByIdx(idx)

            if(!f)
                return player.outputChatBox("Не найдена такая фракция")

            fractions.update(idx, {leader: targ.getVariable('uid')})
            targ.setVariable('fraction', idx)
            targ.setVariable('spawnpoint', new mp.Vector3(f.spawnpoints[0].x, f.spawnpoints[0].y, f.spawnpoints[0].z))
            players.updateCustomByUid(targ, { fraction: idx })

            sendToAdmins(`Администратор ${player.name} назначил ${targ.name} лидером ${f.name}`)
            targ.outputChatBox(`Администратор ${player.name} назначил вас лидером ${f.name}`)
        }
    }   
]
}