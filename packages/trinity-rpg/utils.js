const lvls = require("./lvls")

var exports = module.exports = {}
exports.findPlayerByIdOrNickname = function (playerName){
    if (playerName == parseInt(playerName))
        return mp.players.at(playerName)
    else {
        let foundPlayers = null
        mp.players.forEach(_player => {
            if (_player.name.toLowerCase().startsWith(playerName.toLowerCase())){
                foundPlayers.push(_player)
            }
        })
        
        return (foundPlayers && foundPlayers.length == 1) ? foundPlayers[0] : foundPlayers
    }
}
exports.sendToAdmins = function(text){
    mp.players.forEach(_player => {
        if(_player.getVariable('level') >= lvls.ALL_ADMINS) {
            _player.outputChatBox(text)
        }
    })
}
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