var exports = module.exports = {}
const lvls = require("../lvls")
exports.obj = [
    {
        triggers: ["goto", "to"],
        target: true,
        lvl: lvls.ALL_ADMINS,
        execute: (player, _, targ) => {
            const tpos = targ.position
            player.position = new mp.Vector3(tpos.x + 1, tpos.y + 1, tpos.z)
            player.outputChatBox("Вы были телепортированы")
        }
    },
    {
        triggers: ["gethere", "getheres", "silentgethere"],
        target: true,
        lvl: lvls.ALL_ADMINS,
        execute: (player, trig, targ) => {
            const tpos = player.position
            if(trig == "getheres"){
                // if(targ.vehicle)
                //     targ.vehicle.setForwardSpeed(0)
                targ.position = new mp.Vector3(tpos.x + 1, tpos.y + 1, tpos.z)
            }
            else if(trig == "gethere"){
                if(targ.vehicle)
                    targ.vehicle.position = new mp.Vector3(tpos.x + 2, tpos.y + 2, tpos.z)
                else
                    targ.position = new mp.Vector3(tpos.x + 1, tpos.y + 1, tpos.z)
            }
            else
                return targ.position = new mp.Vector3(tpos.x + 1, tpos.y + 1, tpos.z)
            targ.outputChatBox("Вы были телепортированы")
        }
    }
]