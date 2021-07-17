const lvls = require("../lvls")
const {isMuted} = require("../functions/getMuted")
const COLOR = require("../chat-colors.json")

module.exports = {
obj: [
    {
        triggers: ["a"],
        lvl: lvls.ALL_ADMINS,
        fulltext: true,
        text_non_empty: true,
        hint: "/a [текст]",
        execute: (player, full) =>{
            if(full)
                mp.players.forEach(_player => {
                    if(_player.getVariable("level") >= lvls.ALL_ADMINS)
                        _player.outputChatBox(`${COLOR.A}[A] ${player.name}: ${full}`)
                })
            else
                player.outputChatBox("Подсказка: /a [текст]")
        }
    },
    {
        triggers: ["hc"],
        lvl: lvls.HELPER,
        fulltext: true,
        text_non_empty: true,
        hint: "/hc [текст]",
        execute: (player, full) =>{
            if(full)
                mp.players.forEach(_player => {
                    if(_player.getVariable("level") >= lvls.HELPER)
                        _player.outputChatBox(`${COLOR.HC}[H] ${player.name}: ${full}`)
                })
            else
                player.outputChatBox("Подсказка: /hc [текст]")
        }
    }
]
}