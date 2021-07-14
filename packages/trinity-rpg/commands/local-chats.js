const lvls = require("../lvls")
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

function isMuted(p){
    const v = p.getVariable('muted')
    if(v){
        const t = (v.muteTimeStamp+v.muteDuration)-Date.now()
        if(t <= 0){
            p.setVariable('muted', false)
            return false
        }
        p.outputChatBox(`У вас мут еще ${t} мс. выданный по причине ${v.reason}`)
    }
    return true
}