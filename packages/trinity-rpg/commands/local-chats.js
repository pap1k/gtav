const lvls = require("../lvls")
const COLOR = require("../chat-colors.json")
const log = require("../functions/cmdLog").add
const {isMuted} = require("../functions/getMuted")
var exports = module.exports = {}

mp.events.add('playerChat', localChat)

exports.obj = [
    {
        triggers: ["c"],
        fulltext: true,
        text_non_empty: true,
        lvl: lvls.PLAYER,
        execute: localChat,
    },
    {
        triggers: ["s"],
        fulltext: true,
        text_non_empty: true,
        lvl: lvls.PLAYER,
        execute: (player, fullcmd)=>{
            if(!isMuted(player))
                mp.players.broadcastInRange(player.position, 60, `${COLOR.S}${player.name} крикнул: ${fullcmd}`)
        }
    }
]

function localChat(player, fullcmd){
    if(!isMuted(player)){
        log("CHAT", player.name, "c", Date.now(), fullcmd)
        if(fullcmd[0] == "!")
            mp.players.broadcastInRange(player.position, 5, `${COLOR.CS}${player.name} тихо сказал: ${fullcmd.substring(1, fullcmd.length)}`)
        else
            mp.players.broadcastInRange(player.position, 20, `${COLOR.C}${player.name} сказал: ${fullcmd}`)
    }
       
}