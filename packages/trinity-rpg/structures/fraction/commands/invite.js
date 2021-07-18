const conf = require("./config.json")
const Fraction = require("../../../db_models/Fraction")
const colors = require("../../../chat-colors")
const getFraction = require("../../../globals/Fractions").getById
module.exports = {
obj:
[
    {
        triggers: "invite",
        fraction: conf.ANY,
        target: true,
        execute: (player, _, targ) => {
            const f = getFraction(player.getVariable("fraction"))
            if(f.leader == player.getVariable("uid")){
                targ.outputChatBox(`${player.name} принял вас в ${f.name}`)
                Fraction.findOne({ _id: f._id }, (err, doc) => {
                    doc.players.push(targ.getVariable('uid'))
                    doc.save()
                })
            }
            else{
                player.outputChatBox("У вас нет доступа к этой команде")
            }
        }
    },
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