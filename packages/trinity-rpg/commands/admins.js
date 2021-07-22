const lvls = require("../lvls")
const players = require("../db_worker/players")
const showDialog = require("../functions/showDialog")

module.exports = {
obj:[
    {
        triggers: "check",
        lvl: lvls.ALL_ADMINS,
        target: true,
        execute: async (player, _, targ) => {
            const db_player = await players.getByUid(targ)
            let data = {
                headers: ["", ""],
                cols: [
                    ["Уровень", db_player.score],
                    ["Rockstar Game ID", db_player.rgid],
                    ["Фракция", db_player.fraction],
                    ["Уровень доступа", db_player.player_level],
                ]
            }
            showDialog(player, "Статистика "+targ.name, 1, data)
        }
    }
]
}