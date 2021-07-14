const { MongoTimeoutError } = require("mongodb")
const lvls = require("../lvls")
const {sendToAdmins} = require("../utils")
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

            if(!parseInt(time))
                return player.outputChatBox("Время должно быть числом")
            
            targ.setVariable('muted', {state: true, muteTimeStamp: Date.now(), muteDuration: time, reason})
            targ.outputChatBox(`Администратор ${player.name} выжал вам мут на ${time} минут. Причина: ${reason}`)
            sendToAdmins(`Администратор ${player.name} выдал мут игроку ${targ.name} на ${time} минут. Причина: ${reason}`)
        }
    }
]