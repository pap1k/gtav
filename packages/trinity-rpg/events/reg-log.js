//const db = require("./db")
const Player = require("../db_models/Player")
const spawn = require("../server-side-conf.json").global_spawn
const Fraction = require("../db_models/Fraction")
const {sendToAdmins} = require("../utils")
const lvls = require("../lvls")
const color = require("../chat-colors.json")
const conf = require("./config.json")

mp.events.add('playerJoin', async (player) => {
    if(player.name == "WeirdNewbie"){
        player.outputChatBox("Для игры на этом сервере смените ник в настрйоках клиента RAGE MP (F1 -> Настройки)")
        player.kick("Deafult nickname")
    }
    const p = await Player.find({name: player.name})
    if(p.length == 0){
        //player.call register
        player.call("showReg")
    }
    else{
        //player.call login
        if(conf.allow_nologin){
            authAndSpawn(player, p[0])
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
    player.setVariable('password', p.password)
    sendToAdmins(`Зарегистрирован новый аккаунт - ${player.name}`)
    player.call('hideAllBrowsers')
    console.log("[SERVER] New account has been registered ("+player.name+")")
})

mp.events.add('onPlayerLogin', async (player, data) => {
    data = JSON.parse(data)
    const p = await Player.find({name: player.name})
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

    mp.players.broadcast(`${color.GREY}${player.name} ID ${player.id} подключился к серверу`)

    player.call('hideAllBrowsers')
    if(player.getVariable('fraction') != 0){
        const f = await Fraction.find({idx: dbplayer.fraction})
        if(f.length == 1){
            player.position = new mp.Vector3(f[0].spawnpoints[0].x, f[0].spawnpoints[0].y, f[0].spawnpoints[0].z)
        }
        else
            player.position = new mp.Vector3(spawn.x, spawn.y, spawn.z)
    }
    else
        player.position = new mp.Vector3(spawn.x, spawn.y, spawn.z)
}