var exports = module.exports = {}
const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils.js")
exports.obj = [
    {
        triggers: ['id'],
        lvl: lvls.PLAYER,
        args: 1,
        hint: "/id [id или часть ника]",
        execute: (player, _, arg) => {
            const foundplayer = findPlayerByIdOrNickname(arg)
            if(foundplayer){
                if(foundplayer.length)
                    foundplayer.forEach(p => player.outputChatBox(`${p.name} ID ${p.id}`))
                else
                    player.outputChatBox(`${foundplayer.name} ID ${foundplayer.id}`)
            }
            else
                player.outputChatBox(`По указанным паарметрам не найдено игроков`)    
           
        }
    },
    {
        triggers: ["online"],
        lvl: lvls.PLAYER,
        execute: (player) => {
            let list = ""
            mp.players.forEach(_player => {
                list += _player.name+", "
            })
            player.outputChatBox("Игроки в сети: "+list.substring(list.length-2))
        }
    }
]