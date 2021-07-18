const lvls = require("../lvls")
const Fraction = require("../db_models/Fraction")
const Player = require("../db_models/Player")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["veh", "car"],
        lvl: lvls.TESTER,
        execute: (player, _, vehName) => {
            if (vehName && vehName.trim().length > 0) {
                if(vehName == "1")
                    vehName = "oppressor2"
                let pos = player.position
                pos.x += 3
                mp.vehicles.new(vehName, pos)
            } else {
                player.outputChatBox("Подсказка: /veh [id]")
            }
        }
    },
    {
        triggers: "fspawn",
        lvl: lvls.ALL_ADMINS,
        args: 1,
        hint: "/fspawn [IDX фракции] [номер точки]",
        execute: async (player, _, to, num) => {
            if(!parseInt(to))
                return player.outputChatBox("Ошибка: id фракции должен быть числом")
            if(num && !parseInt(num))
                return player.outputChatBox("Ошибка: номерточки должен быть числом")
            const f = await Fraction.find({idx: parseInt(to)})
            if(f.length == 1){
                if(num){
                    if(f[0].spawnpoints.length >= num)
                        player.position = new mp.Vector3(f[0].spawnpoints[num-1].x, f[0].spawnpoints[num-1].y, f[0].spawnpoints[num-1].z)
                    else
                        player.outputChatBox("У фракции нет спавна с таким номером")
                }
                else
                    player.position = new mp.Vector3(f[0].spawnpoints[0].x, f[0].spawnpoints[0].y, f[0].spawnpoints[0].z)
            }
            else
                player.outputChatBox("Не удалось найти фракцию с таким IDX")
        }
    },
    {
        triggers: "createfraction",
        lvl: lvls.UNIQUE_LEVEL,
        args: 2,
        hint: "/createfraction [idx] [название]",
        execute: async (player, _, idx, name) => {
            if(!parseInt(idx))
                return player.outputChatBox("idx должен быть числом")
            const {create} = require("../functions/createFraction")
            const result = await create(parseInt(idx), name, player.position)
            player.outputChatBox(result)
        }
    },
    {
        triggers: "deletefraction",
        lvl: lvls.UNIQUE_LEVEL,
        args: 1,
        hint: "/deletefraction [idx]",
        execute: async (player, _, idx) => {
            if(!parseInt(idx))
                return player.outputChatBox("idx должен быть числом")
            const {del} = require("../functions/createFraction")
            const result = await del(parseInt(idx))
            player.outputChatBox(result)
        }
    },
    {
        triggers: "addspawnpoint",
        lvl: lvls.TESTER,
        args: 1,
        hint: "/addspawnpoint [IDX фракции]",
        execute: async (player, _, idx) => {
            if(!parseInt(idx))
                return player.outputChatBox("idx должен быть числом")
            Fraction.findOne({idx: parseInt(idx)}, (err, doc) => {
                if(!err){
                    doc.spawnpoints.push({x: player.position.x, y: player.position.y, z: player.position.z})
                    doc.save()
                    player.outputChatBox("Для фракции "+doc.name+" добавлена точка спавна")
                }
                else
                    player.outputChatBox("Ошибка какая то. в логе мб")
            })
        }  
    },
    {
        triggers: ["weap", "weapon"],
        lvl: lvls.TESTER,
        args: 1,
        execute: (player, _, weap) => {
            const weaponHash = mp.joaat("weapon_"+weap)
            player.giveWeapon(weaponHash, 10000)
        }
    },
    {
        triggers: ["gweap", "ggun"],
        lvl: lvls.TESTER,
        target: true,
        hint: "/gweap [id] [оружие]",
        args: 2,
        execute: (player, _, targ, weap) => {
            const weaponHash = mp.joaat("weapon_"+weap)
            targ.giveWeapon(weaponHash, 10000)
            targ.outputChatBox("Тестер "+player.name+" выдал вам оружие")
        }
    },
    {
        triggers: "tppos",
        lvl: lvls.TESTER,
        execute: (player, _, x, y, z) => {
            if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z))){
                player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
            }
            else
                player.outputChatBox("Подсказка: /tppos [x] [y] [z]")
        }
    },
    {
        triggers: "maketester",
        lvl: lvls.UNIQUE_LEVEL,
        target: true,
        hint: "/maketester [id или часть ника]",
        execute: (player, _, target) => {
            Player.findOne({rgid: target.rgscId, name: target.name}, (err, doc) => {
                doc.player_level = lvls.TESTER
                doc.save()
            })
            target.setVariable("level", lvls.TESTER)
            player.outputChatBox("Вы назначили "+target.name+" тестером")
            target.outputChatBox("Создатель проекта "+player.name+" назначил вас тестером")
        }
    },
    {
        triggers: "destroy",
        lvl: lvls.UNIQUE_LEVEL,
        target: true,
        hint: "/destroy [id или часть ника]",
        execute: (player, _, target) => {
            Player.findOne({rgid: target.rgscId, name: target.name}, (err, doc) => {
                doc.player_level = lvls.PLAYER
                doc.save()
            })
            target.setVariable("level", lvls.PLAYER)
            player.outputChatBox("Вы сняли "+target.name+" с должности тестера")
            target.outputChatBox("Создатель проекта "+player.name+" сналя вас с должности тестера")
        }
    },
    {
        triggers: "agm",
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            const v = player.getVariable("agm")
            if(agm){
                player.outputChatBox("Вы включили AGM")
                player.setVariable("agm", true)
            }
            else{
                player.outputChatBox("Вы выключили AGM")
                player.setVariable("agm", false)
            }
        }
    }
]