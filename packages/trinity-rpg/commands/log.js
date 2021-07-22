const lvls = require("../lvls")
const {get} = require("../functions/cmdLog")
const showDialog = require("../functions/showDialog")
module.exports = {
    obj: [
        {
            triggers: ["chatlog", "chlog"],
            lvl: lvls.ALL_ADMINS,
            target: true,
            execute: (player, _, target, amount) => {
                if(player.getVariable("level") < target.getVariable("level"))
                    return player.outputChatBox("Вы не можете просматривать статистику вышестоящих администраторов")
                amount = amount ? amount : 30
                const log = get("CHAT", target.name, amount)
                let d = {headers: ["Время", "Чат", "Сообщение"], cols: []}
                log.forEach(e => {
                    let date = new Date(e.time)

                    let hour = date.getHours()
                    hour = hour < 10 ? `0${hour}` : hour

                    let min = date.getMinutes()
                    min = min < 10 ? `0${min}` : min

                    let sec = date.getSeconds()
                    sec = sec < 10 ? `0${sec}` : sec
                    
                    d.cols.push([`${hour}:${min}:${sec}`,  e.cmd, e.add])
                })
                showDialog(player, 1, "Чатлог игрока "+target.name+"("+amount+")", d)
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