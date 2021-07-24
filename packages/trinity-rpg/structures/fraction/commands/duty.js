const conf = require("./config.json")
const colors = require("../../../chat-colors")
const fColors = require("../fractColors.json")
module.exports = {
    obj: [
        {
            triggers: ["duty"],
            fraction: conf.ANY,
            execute: (player) => {
                //TOOD change skin
                if(player.getVariable('onduty') === true){
                    mp.players.call("updatePlayerColor", [JSON.stringify({"id": player.id, "color": [255, 255, 255]})])
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} снял служебный костюм и вышел со смены`)
                    return player.setVariable('onduty', false)
                }
                else{
                    const c = fColors[player.getVariable("fraction")]
                    const data = {"id": player.id, "color": [c[0], c[1], c[2]]}
                    mp.players.call("updatePlayerColor", [JSON.stringify(data)])
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} надел служебный костюм и вышел на смену`)
                    return player.setVariable('onduty', true)
                }
                
            }
        }
    ]
}