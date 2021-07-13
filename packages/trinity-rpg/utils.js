var exports = module.exports = {}
exports.findPlayerByIdOrNickname = function (playerName){
    if (playerName == parseInt(playerName))
        return mp.players.at(playerName);
    else {
        let foundPlayer = null;
        
        mp.players.every((_player) => {
        if (_player.name.startsWith(playerName)) {
            foundPlayer = _player;
            return false;
        }
        return true;
        });
        
        return foundPlayer;
    }
}
exports.sendToAdmins = function(text){
    mp.players.forEach((_player) => {
        if (_player.name === playerName) {
            foundPlayer = _player;
            return;
        }
        });
}
exports.log = function(text, type){
    if(!type) type = "info"
    let color;
    switch(type){
        case "info":
            color = "\x1b[1m"
            break;
        case "warn":
            color = "\x1b[33m"
            break;
        case "err":
            color = "\x1b[32m"
            break;
        case "done":
            color = "\x1b[32m"
            break;
        default:
            break;
    }
    console.log(color+"["+type.toUpperCase()+"]\x1b[0m "+text)
}