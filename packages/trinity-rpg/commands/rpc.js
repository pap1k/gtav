const lvls = require("../lvls")
const {sendToAdmins} = require("../utils")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["rpc"],
        lvl: lvls.ALL_ADMINS,
        execute: (player) => {
            if (player.vehicle)
                player.vehicle.repair()
            else
                player.outputChatBox("Вы должны находиться в транспорте")
        }    
    },
    {
        triggers: ["rcar", "repaircar"],
        lvl: lvls.ALL_ADMINS,
        hint: "/rcar [id или часть ника]",
        target: true,
        execute: (player, _, target) => {
            if(target.vehicle){
                target.vehicle.repair()
                sendToAdmins(`Администратор ${player.name} отремонтировал транспорт игрока ${target.name}`)
            }
            else
                player.outputChatBox("Указанный вами игрок не находится в транспорте")
        }
    }
]