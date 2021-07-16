const lvls = require("../lvls")
const {isMuted} = require("../functions/getMuted")

module.exports = {
obj: [
    {
        triggers: ["a"],
        lvl: lvls.ALL_ADMINS,
        fulltext: true,
        execute: (player, full) =>{
            mp.players.forEach(_player => {
                if(_player.getVariable("level") >= lvls.ALL_ADMINS)
                    _player.outputChatBox("!{#FF9966}"+player.name +": "+full)
            })
        }
    },
    {
        triggers: ["hc"],
        lvl: lvls.HELPER,
        fulltext: true,
        execute: (player, full) =>{
            if(full)
                mp.players.forEach(_player => {
                    if(_player.getVariable("level") >= lvls.HELPER)
                        _player.outputChatBox("ЦВЕТ"+player.name +": "+full)
                })
            else
                player.outputChatBox("Подсказка: /a [текст]")
        }
    }
]
}