const lvls = require("../lvls")
mp.events.add("playerQuit", (player, exit, reason) => {
    mp.players.forEach(p => {
        if(p.getVariable("level") >= lvls.ALL_ADMINS)
            p.outputChatBox(`${color.GREY}${player.name} [ID ${player.id}] [IP ${player.ip}] покинул сервер (${exit} - ${reason})`)
        else
            p.outputChatBox(`${color.GREY}${player.name} [ID ${player.id}] покинул сервер (${exit})`)
    })
    console.log(`${player.name} leaving`)
})