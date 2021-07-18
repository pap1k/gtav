const conf = require("./config.json")
const colors = require("../../../chat-colors")
module.exports = {
    obj: [
        {
            triggers: ["duty"],
            fraction: conf.ANY,
            execute: player => {
                //TOOD color player tag, change skin
                if(player.getVariable('onduty')){
                    player.setVariable('onduty', false)
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} снял служебный костюм и вышел со смены`)
                }
                else{
                    player.setVariable('onduty', true)
                    mp.players.broadcastInRange(player.position, 5, `${colors.ME}${player.name} надел служебный костюм и вышел на смену`)
                }
                
            }
        }
    ]
}