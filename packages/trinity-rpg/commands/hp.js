//Allows set HP
const utils = require('../utils.js')
const lvls = require("../lvls")
module.exports = {
obj:[
    {
        triggers: ["hp"],
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            player.health = 100
            player.outputChatBox("Вы были вылечены")
        }
    },
    {
        triggers: ["sethp"],
        lvl: lvls.ALL_ADMINS,
        target: true,
        args: 2,
        hint: "/sethp [id или часть нкиа] [значение]",
        execute: (player, _, target, hp) => {
            if(!parseInt(hp) || (hp < 0 && hp > 100))
                return player.outputChatBox("Число должно быть числом от 0 до 100")
            target.health = parseInt(hp)
            player.outputChatBox("Вы установили HP игрока "+target.name+" на "+hp)
            if(player !== target)
                utils.sendToAdmins(`Администратор ${player.name} установил HP игрока ${target.name} на ${hp}`)
        }
    },
    {
        triggers: ["arm"],
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            player.armour = 100
            player.outputChatBox("Ваша броня восстановлена")
        }
    },
    {
        triggers: ["setarm"],
        lvl: lvls.ALL_ADMINS,
        target: true,
        args: 2,
        hint: "/setarm [id или часть нкиа] [значение]",
        execute: (player, _, target, hp) => {
            if(!parseInt(hp) || (hp < 0 && hp > 100))
                return player.outputChatBox("Число должно быть числом от 0 до 100")
            target.armour = parseInt(hp)
            player.outputChatBox("Вы установили броню игрока "+target.name+" на "+hp)
            if(player !== target)
                utils.sendToAdmins(`Администратор ${player.name} установил броню игрока ${target.name} на ${hp}`)
        }
    },
]
}