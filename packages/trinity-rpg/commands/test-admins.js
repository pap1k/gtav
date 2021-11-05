const lvls = require("../lvls")
const fractions = require("../db_worker/fractions")
const players = require("../db_worker/players")
const Veh = require("../globals/Vehicles")
const colors = require("../chat-colors.json")
const parkings = require("../db_worker/parkings")
var exports = module.exports = {}
exports.obj = [
    {triggers: ["veh", "car"],
        lvl: lvls.TESTER,
        args: 1,
        hint: "/veh [id]",
        execute: (player, _, vehName) => {
            if(vehName == "a")
                vehName = "oppressor2"
            if(parseInt(vehName)){
                if(Veh.Vehicles[vehName])
                    vehName = Veh.Vehicles[vehName][1]
                else
                    return player.outputChatBox("Не найдено ТС с таким ID")
            }
            else{
                let foundHash = Veh.findByName(vehName) 
                if(foundHash)
                    vehName = foundHash
                else
                    return player.outputChatBox("Не найдено ТС с таким названием")
            } 
            let pos = player.position
            pos.x += 1
            pos.z += 1
            Veh.spawn(vehName, pos, player.getVariable("uid"))
        }
    },
    {triggers: ["vinfo", "vehinfo"],
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            let closest
            let lastdist
            mp.vehicles.forEach(veh => {
                let dist = player.dist(veh.position)
                if(!closest)
                    closest = veh
                else
                    if(dist < lastdist)
                        closest = veh
                lastdist = dist
            })
            if(closest && player.dist(closest.position) < 10){
                let isOnline = false
                let last_driver = closest.getVariable("last_driver") ? "off" : "no"
                mp.players.forEach(player => {
                    if(player.name == closest.getVariable('owner_name'))
                        isOnline = true
                    if(player.getVariable("uid") == closest.getVariable("last_driver"))
                        last_driver = player.name
                })
                const d = new Date(closest.getVariable("spawntime"))
                let timespawn = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` 
                if(last_driver == "off")
                    players.getByUid(closest.getVariable("last_driver")).then(p => {
                        player.outputChatBox(`V: ${closest.getVariable('name')}, O: ${closest.getVariable('owner_name')} ${(isOnline ? '' : '[OFF]')}, LD: ${player.name} [OFF], S: ${timespawn}`)
                    })
                else
                    player.outputChatBox(`V: ${closest.getVariable('name')}, O: ${closest.getVariable('owner_name')} ${(isOnline ? '' : '[OFF]')}, LD: ${last_driver}, S: ${timespawn}`)
            }
            else
                player.outputChatBox("Около вас не найдено ТС")
        }
    },
    {triggers: ["vinfonew"],
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            let closest
            let lastdist
            Veh.List.forEach(veh => {
                let dist = player.dist(veh.position)
                if(!closest)
                    closest = veh
                else
                    if(dist < lastdist)
                        closest = veh
                lastdist = dist
            })
            if(closest && player.dist(closest.position) < 30){
                let playername = "off"
                mp.players.forEach(player => {
                    if(player.getVariable("uid") == closest.getVariable('owner'))
                        return playername = player.name
                })
                player.outputChatBox(`V: ${closest.getVariable('name')}, O: ${playername}`)
            }
            else
                player.outputChatBox("Около вас не найдено ТС")
        }
    },
    {triggers: "fspawn",
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
    {triggers: "getf",
        lvl: lvls.ALL_ADMINS,
        target: true,
        execute: (p, _, t) => {
            p.outputChatBox(t.getVariable("fraction"))
        }
    },
    {triggers: "createfraction",
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
    {triggers: "deletefraction",
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
    {triggers: "addspawnpoint",
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
    {triggers: ["weap", "weapon"],
        lvl: lvls.TESTER,
        args: 1,
        execute: (player, _, weap) => {
            const weaponHash = mp.joaat("weapon_"+weap)
            player.giveWeapon(weaponHash, 10000)
        }
    },
    {triggers: ["gweap", "ggun"],
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
    {triggers: "tppos",
        lvl: lvls.TESTER,
        execute: (player, _, x, y, z) => {
            if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z))){
                player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
            }
            else
                player.outputChatBox("Подсказка: /tppos [x] [y] [z]")
        }
    },
    {triggers: "maketester",
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
    {triggers: "destroy",
        lvl: lvls.UNIQUE_LEVEL,
        target: true,
        hint: "/destroy [id или часть ника]",
        execute: (player, _, target) => {
            players.updateDefault(player, {player_level: lvls.PLAYER})
            target.setVariable("level", lvls.PLAYER)
            player.outputChatBox("Вы сняли "+target.name+" с должности тестера")
            target.outputChatBox("Создатель проекта "+player.name+" снял вас с должности тестера")
        }
    },
    {triggers: "fixmydbprofile",
        lvl: lvls.UNIQUE_LEVEL,
        execute: player => {
            players.updateDefault(player, {player_level: lvls.UNIQUE_LEVEL})
            player.outputChatBox("Уровень доступа восстановлен")
        }
    },
    {triggers: "agm",
        lvl: lvls.ALL_ADMINS,
        execute: player => {
            const v = player.getVariable("agm")
            if(v){
                player.outputChatBox("Вы включили AGM")
                player.setVariable("agm", true)
            }
            else{
                player.outputChatBox("Вы выключили AGM")
                player.setVariable("agm", false)
            }
        }
    },
    {triggers: "shottp",
        lvl: lvls.TESTER,
        execute: player => {
            player.call("toggleShotTp")
            const tpweapon = mp.joaat("weapon_pistol50")
            if(player.getVariable("shottp")){
                player.setVariable("shottp", false)
                player.outputChatBox(`Режим ${colors.TURN_OFF}ВЫКЛЮЧЕН`)
                const weaps = player.allWeapons
                if (tpweapon in weaps)
                    player.removeWeapon(tpweapon)
            }
                
            else{
                player.setVariable("shottp", true)
                player.outputChatBox(`Режим ${colors.TURN_ON}ВКЛЮЧЕН`)
                player.giveWeapon(tpweapon, 10000)
            }
                
            
        }
    },
    {triggers: "dance",
        lvl: lvls.PLAYER,
        execute: player => {
            player.call("anim.dance")
        }
    },
    {
        triggers: "createparking",
        lvl: lvls.TESTER,
        execute: async player => {
            const r = await parkings.create(player.position)
            player.outputChatBox("Паркинг создан. ID: "+r._id)
        }
    }
]