const lvls = require("../lvls")
var exports = module.exports = {}
//TODO CHECK IF PLAYER HAS MUTED
exports.obj = [
    {
        triggers: ["c"],
        lvl: lvls.PLAYER,
        execute: (player, fullcmd)=>{
            console.log(player, fullcmd)
            mp.players.broadcastInRange(player.position, 20, `${player.name} сказал: ${fullcmd}`)
        }
    },
    {
        triggers: ["s"],
        lvl: lvls.PLAYER,
        execute: (player, fullcmd)=>{
            mp.players.broadcastInRange(player.position, 60, `${player.name} крикнул: ${fullcmd}`)
        }
    }
]