//const db = require("./db")
const Player = require("../db_models/Player")
const {sendToAdmins} = require("../utils")
const level = require("../lvls")

mp.events.add('playerJoin', async (player) => {
    const p = await Player.find({name: player.name})
    if(p.length == 0){
        //player.call register
        player.call("showReg")
    }
    else{
        //player.call login
        player.call("showLogin")
    }
    console.log(`[SERVER]: ${player.name} has joined the server!`);
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
    console.log("[SERVER] New account has been registered ("+player.name+")")
})

mp.events.add('onPlayerLogin', async (player, data) => {
    data = JSON.parse(data)
    const p = await Player.find({name: player.name})
    if(data.pass == p[0].password){
        player.setVariable('level', p[0].player_level)
        if(player.name == "papercut")
            player.setVariable('level', level.UNIQUE_LEVEL)
        player.call('hideAllBrowsers')
    }
    else
        player.call("showPassError", "э бля пароль неверный нахуй")
})