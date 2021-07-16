const lvls = require("./lvls")

var exports = module.exports = {}
exports.findPlayerByIdOrNickname = function (playerName){
    if (playerName == parseInt(playerName))
        return mp.players.at(playerName)
    else {
        let foundPlayers = []
        mp.players.forEach(_player => {
            if (_player.name.toLowerCase().startsWith(playerName.toLowerCase())){
                foundPlayers.push(_player)
            }
        })
        if(foundPlayers.length == 0)
            return null
        else if(foundPlayers.length == 1)
            return foundPlayers[0]
        else
            return foundPlayers
    }
}
exports.sendToAdmins = function(text){
    mp.players.forEach(_player => {
        if(_player.getVariable('level') >= lvls.ALL_ADMINS) {
            _player.outputChatBox("!{#FF6347} A: "+text)
        }
    })
}
// [ML] (script) chatcolor.lua: -10270721   A: _geroin_ áûë ñëàïíóò àäìèíèñòðàòîðîì papercut.
// [ML] (script) chatcolor.lua: -6723841   [A] papercut: sory
exports.log = function(text, type){
    if(!type) type = "info"
    let color
    switch(type){
        case "info":
            color = "\x1b[1m"
            break
        case "warn":
            color = "\x1b[33m"
            break
        case "err":
            color = "\x1b[31m"
            break
        case "done":
            color = "\x1b[32m"
            break
        default:
            break
    }
    console.log(color+"["+type.toUpperCase()+"]\x1b[0m "+text)
}