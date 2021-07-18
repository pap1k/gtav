const lvls = require("../lvls")
const Fraction = require("../db_models/Fraction")
const Player = require("../db_models/Player")
const {sendToAdmins} = require("../utils")
module.exports = {
obj: [
    {
        triggers: ["makeleader"],
        lvl: lvls.ADMIN_LEVEL_4,
        target: true,
        args: 2,
        hint: "/makeleader [id или часть ника] [IDX фракции]",
        execute: async (player, _, targ, idx)=> {
            if(isNaN(idx) || isNaN(parseInt(idx)))
                return player.outputChatBox("IDX должен быть числом: ")
            idx = parseInt(idx)
            const fract = await Fraction.findOne({idx})
            if(!fract)
                return player.outputChatBox("Не найдена такая фракция")
            Fraction.findOne({idx}, (e, doc) => {
                doc.leader = targ.getVariable('uid')
                doc.save()
            })
            Player.findOne({_id: targ.getVariable('uid')}, (e, doc) => {
                doc.fraction = idx
                doc.save()
            })
            targ.setVariable('fraction', idx)

            sendToAdmins(`Администратор ${player.name} назначил ${targ.name} лидером ${fract.name}`)
            targ.outputChatBox(`Администратор ${player.name} назначил вас лидером ${fract.name}`)
        }
    }   
]
}