const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils")
const Fraction = require("../db_models/Fraction")
const Player = require("../db_models/Player")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["veh", "car"],
        lvl: lvls.TESTER,
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
        triggers: ["fspawn"],
        lvl: lvls.ALL_ADMINS,
        args: 1,
        hint: "/fspawn [IDX фракции]",
        execute: async (player, _, to) => {
            if(!parseInt(to))
                return player.outputChatBox("Ошибка: id фракции должен быть числом")
            const f = await Fraction.find({idx: parseInt(to)})
            console.log(f[0])
            if(f.length == 1)
                player.position = new mp.Vector3(f[0].spawnpoints[0].x, f[0].spawnpoints[0].y, f[0].spawnpoints[0].z)
            else
                player.outputChatBox("не удалось найти фракцию с таким IDX")
        }
    },
    {
        triggers: ["createfraction"],
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
        triggers: ["tppos"],
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
        triggers: ["maketester"],
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
        triggers: ["destroy"],
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
        triggers: ["log"],
        lvl:  lvls.PLAYER,
        execute: player => console.log(player)
    }
]