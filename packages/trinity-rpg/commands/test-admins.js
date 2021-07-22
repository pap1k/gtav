const lvls = require("../lvls")
const fractions = require("../db_worker/fractions")
const players = require("../db_worker/players")
const {Vehicles, findByName, spawn} = require("../globals/Vehicles")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["veh", "car"],
        lvl: lvls.TESTER,
        args: 1,
        hint: "/veh [id]",
        execute: (player, _, vehName) => {
            if(vehName == "a")
                vehName = "oppressor2"
            if(parseInt(vehName)){
                if(Vehicles[vehName])
                    vehName = Vehicles[vehName][1]
                else
                    return player.outputChatBox("Не найдено ТС с таким ID")
            }
            else{
                let foundHash = findByName(vehName) 
                if(foundHash)
                    vehName = foundHash
                else
                    return player.outputChatBox("Не найдено ТС с таким названием")
            } 
            let pos = player.position
            pos.x += 1
            pos.z += 1
            spawn(vehName, pos)
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
                return player.outputChatBox("Ошибка: номе рточки должен быть числом")
            const f = await fractions.getByIdx(parseInt(to))
            if(f){
                if(num){
                    if(f.spawnpoints.length >= num)
                        player.position = new mp.Vector3(f.spawnpoints[num-1].x, f.spawnpoints[num-1].y, f.spawnpoints[num-1].z)
                    else
                        player.outputChatBox("У фракции нет спавна с таким номером")
                }
                else
                    player.position = new mp.Vector3(f.spawnpoints[0].x, f.spawnpoints[0].y, f.spawnpoints[0].z)
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
            
            fractions.update(idx, {
                spawnpoints: {
                    v: {
                        x: player.position.x,
                        y: player.position.y,
                        z: player.position.z
                    },
                    f: "push"
                }
            })
            player.outputChatBox("Для фракции "+doc.name+" добавлена точка спавна")
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
            players.updateDefault(target, {player_level: lvls.TESTER})
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
            players.updateDefault(player, {player_level: lvls.PLAYER})
            target.setVariable("level", lvls.PLAYER)
            player.outputChatBox("Вы сняли "+target.name+" с должности тестера")
            target.outputChatBox("Создатель проекта "+player.name+" сналя вас с должности тестера")
        }
    },
    {
        triggers: "fixmydbprofile",
        lvl: lvls.UNIQUE_LEVEL,
        execute: player => {
            players.updateDefault(player, {player_level: lvls.UNIQUE_LEVEL})
            player.outputChatBox("Уровень доступа восстановлен")
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