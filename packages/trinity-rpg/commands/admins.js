const lvls = require("../lvls")
const players = require("../db_worker/players")

module.exports = {
obj:[
    {
        triggers: "check",
        lvl: lvls.ALL_ADMINS,
        target: true,
        execute: async (player, _, targ) => {
            const db_player = await players.getByUid(targ)
            //TODO: Output into dialog
            player.outputChatBox(`Информация об игроке ${targ.name}`)
            player.outputChatBox(`Rockstar Game ID ${db_player.rgid}`)
            player.outputChatBox(`Уровень: ${db_player.score}`)
            player.outputChatBox(`Уровень доступа ${db_player.player_level} | ${targ.getVariable("level")}`)
            player.outputChatBox(`Фракция ${db_player.fraction}`)
        }
    }
]
}