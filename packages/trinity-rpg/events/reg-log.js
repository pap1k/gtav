//const db = require("./db")
const Player = require("../db_worker/db_models/Player")
const players = require("../db_worker/players")
const fractions = require("../db_worker/fractions")
const {sendToAdmins} = require("../utils")
const spawn = require("../server-side-conf.json").global_spawn
const color = require("../chat-colors.json")
const conf = require("./config.json")

mp.events.add('playerJoin', async (player) => {
    if(player.name == "WeirdNewbie"){
        player.outputChatBox("Для игры на этом сервере смените ник в настрйоках клиента RAGE MP (F1 -> Настройки)")
        return player.kick("Default nickname")
    }

    const p = await players.getByName(player)
    if(!p){
        //player.call register
        player.call("showReg")
    }
    else{
        //player.call login
        if(conf.allow_nologin){
            authAndSpawn(player, p)
            return console.log(`[SERVER]: ${player.name} has joined the server!`)
        }
        player.call("showLogin")
    }
    console.log(`[SERVER]: ${player.name} has joined the server!`)
});

mp.events.add('onPlayerRegister', async (player, data) => {
    data = JSON.parse(data)
    const p = new Player({
        name: player.name,
        rgid: player.rgscId,
        password: data.pass1
    })
    await p.save()
    authAndSpawn(player, p)
    sendToAdmins(`Зарегистрирован новый аккаунт - ${player.name}`)
    console.log("[SERVER] New account has been registered ("+player.name+")")
})

mp.events.add('onPlayerLogin', async (player, data) => {
    data = JSON.parse(data)
    const p = await players.getByName(player)
    if(data.pass == p[0].password)
        authAndSpawn(player, p)
    else
        player.call("showPassError", "э бля пароль неверный нахуй")
})

async function authAndSpawn(player, dbplayer){
    player.setVariable('level', dbplayer.player_level)
    player.setVariable('fraction', dbplayer.fraction)
    player.setVariable('spawnpoint', new mp.Vector3(dbplayer.spawn.x, dbplayer.spawn.y, dbplayer.spawn.z))
    player.setVariable('uid', dbplayer._id)
    player.setVariable('onduty', false)

    mp.players.broadcast(`${color.GREY}${player.name} ID ${player.id} подключился к серверу`)
    mp.players.call("updatePlayerColor", [JSON.stringify({"id": player.id, "color": [255, 255, 255]})])

    player.call('hideAllBrowsers')
    if(player.getVariable('fraction') != 0){
        const f = await fractions.getByIdx(dbplayer.fraction)
        if(f){
            player.position = new mp.Vector3(f.spawnpoints[0].x, f.spawnpoints[0].y, f.spawnpoints[0].z)
        }   
        else
        //TODO: CHOOSE ONE OF SPAWNS
            player.position = new mp.Vector3(spawn.x, spawn.y, spawn.z)
    }
    else
        player.position = new mp.Vector3(spawn.x, spawn.y, spawn.z)
    //player.call("playRadio")
}