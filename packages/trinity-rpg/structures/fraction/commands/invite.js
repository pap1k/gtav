const conf = require("./config.json")
const Fraction = require("../../../db_worker/db_models/Fraction")
const Player = require("../../../db_worker/db_models/Player")
const colors = require("../../../chat-colors")

module.exports = {
obj:
[
    {
        triggers: "invite",
        fraction: conf.ANY,
        target: true,
        execute: async (player, _, targ) => {
            const f = await Fraction.findOne({idx: player.getVariable("fraction")})
            if(f.leader == player.getVariable("uid")){
                targ.outputChatBox(`${player.name} принял вас в ${f.name} (DISABELD)`)
                // Fraction.findOne({ _id: f._id }, (err, doc) => {
                //     doc.players.push(targ.getVariable('uid'))
                //     doc.save()
                // })
                // Player.findOne({_id: targ.getVariable('uid')}, (e, doc) => {
                //     doc.fraction = f.idx
                //     doc.save()
                // })
                // player.setVariable('fraction', f.idx)
                player.outputChatBox(`Вы пряняли ${targ.name} в ${f.name} (DISABELD)`)
            }
            else{
                player.outputChatBox("У вас нет доступа к этой команде")
            }
        }
    }
]
}