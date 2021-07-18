const lvls = require("../lvls")
const {get} = require("../functions/cmdLog")
module.exports = {
    obj: [
        {
            triggers: ["chatlog"],
            lvl: lvls.ALL_ADMINS,
            target: true,
            execute: (player, _, target, amount) => {
                if(player.getVariable("level") < target.getVariable("level"))
                    return player.outputChatBox("Вы не можете просматривать статистику вышестоящих администраторов")
                amount = amount ? amount : 10
                const log = get("CHAT", target.name, amount)
                player.outputChatBox(`ПОСЛЕДНИЕ ${amount} СООБЩЕНИЙ ИГРОКА ${target.name}`)
                log.forEach(e => {
                    player.outputChatBox(`>> [${e.cmd}] > ${e.add}`)
                })
            }
        },
        {
            triggers: ["cmdlog"],
            lvl: lvls.ALL_ADMINS,
            target: true,
            execute: (player, _, target, amount) => {
                if(player.getVariable("level") < target.getVariable("level"))
                    return player.outputChatBox("Вы не можете просматривать статистику вышестоящих администраторов")
                amount = amount ? amount : 10
                const log = get("CMD", target.name, amount)
                player.outputChatBox(`ПОСЛЕДНИЕ ${amount} КОМАНД ИГРОКА ${target.name}`)
                log.forEach(e => {
                    player.outputChatBox(`>> /${e.cmd}`)
                })
            }
        }
    ]
    }