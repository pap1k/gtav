//const db = require("./db")
const Player = require("./db_models/Player")
mp.events.add('playerJoin', async (player) => {
    const p = await Player.find({name: player.name})
    console.log("p", p)
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
        rgid: player.гетргскид,
        password: data.pass1
    })
    await p.save()
})

mp.events.add('onPlayerLogin', async (player, data) => {
    data = JSON.parse(data)
    console.log("login", data)
})