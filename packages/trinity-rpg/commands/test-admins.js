const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils")
const Player = require("../db_models/Player")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["veh", "car"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, vehName) => {
            if (vehName && vehName.trim().length > 0) {
                let pos = player.position
                pos.x += 3
                mp.vehicles.new(vehName, pos)
            } else {
                player.outputChatBox("Подсказка: /veh [id]")
            }
        }
    },
    {
        triggers: ["tppos"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, x, y, z) => {
            if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z))){
                player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
            }
            else
                player.outputChatBox("Подсказка: /tppos [x] [y] [z]")
        }
    },
    {
        triggers: ["makeunique"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, target) => {
            if(target){
                const t = findPlayerByIdOrNickname(target)
                
                if(!t)
                    return player.outputChatBox("Не найден такой игрок")
                if(t.length)
                    return player.outputChatBox("Найдено несколько таких игроков")

                Player.findOne({rgid: t.rgscId, name: t.name}, (err, doc) => {
                    doc.player_level = lvls.UNIQUE_LEVEL
                    doc.save()
                })  
            }
            else
                player.outputChatBox("Подсказка: /makeunique [id или часть ника]")
        }
    },
    {
        triggers: ["destroy"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, target) => {
            if(target){
                const t = findPlayerByIdOrNickname(target)
                if(t){
                    Player.findOne({rgid: t.rgscId, name: t.name}, (err, doc) => {
                        doc.player_level = lvls.PLAYER
                        doc.save()
                    })
                }
                else
                    player.outputChatBox("Не найден такой игрок")
            }
            else
                player.outputChatBox("Подсказка: /destroy [id или часть ника]")
        }
    },
    {
        triggers: ["log"],
        lvl:  lvls.PLAYER,
        execute: player => console.log(player)
    }
]