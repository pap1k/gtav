const lvls = require("../lvls")
const {findPlayerByIdOrNickname, sendToAdmins} = require("../utils")
var exports = module.exports = {}

exports.obj = [
    {
        triggers: ["mute"],
        lvl: lvls.ALL_ADMINS,
        args: 3,
        target: true,
        hint: "/mute [id или часть ника] [время] [причина]",
        execute: (player, _, targ, time, reason) => {
            if(targ.getVariable('muted'))
                return player.outputChatBox("Указанный игрок уже находится в муте")

        }
    }
]