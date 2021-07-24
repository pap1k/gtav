const conf = require("./config.json")
const colors = require("../../../chat-colors")
const fColors = require("../fractColors.json")
module.exports = {
    obj: [
        {
            triggers: ["duty"],
            fraction: conf.ANY,
            execute: (player, fract) => {
                //TOOD color player tag, change skin
                if(player.getVariable('onduty')){
                    player.setVariable('onduty', false)
                    mp.players.call("updatePlayerColor", [player.id, [255, 255, 255]])
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} снял служебный костюм и вышел со смены`)
                }
                else{
                    player.setVariable('onduty', true)
                    mp.players.call("updatePlayerColor", [player.id, fColors[fract]])
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} надел служебный костюм и вышел на смену`)
                }
                
            }
        }
    ]
}