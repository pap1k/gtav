const lvls = require("../lvls")
const {isMuted} = require("../functions/getMuted")
var exports = module.exports = {}

mp.events.add('playerChat', localChat)

exports.obj = [
    {
        triggers: ["c"],
        lvl: lvls.PLAYER,
        execute: localChat,
    },
    {
        triggers: ["s"],
        lvl: lvls.PLAYER,
        execute: (player, fullcmd)=>{
            if(!isMuted(player))
                mp.players.broadcastInRange(player.position, 60, `${player.name} крикнул: ${fullcmd}`)
        }
    }
]

function localChat(player, fullcmd){
    if(!isMuted(player))
        mp.players.broadcastInRange(player.position, 20, `${player.name} сказал: ${fullcmd}`)    
}