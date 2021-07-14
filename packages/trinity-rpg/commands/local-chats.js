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
    const v = p.getVariable('muted') ? true : false
    if(v)
        p.outputChatBox("У вас мут выданный по причине TODO ПРИЧИНА")
    return v
}