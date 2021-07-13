const lvls = require("../lvls")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["veh", "car"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, vehName) => {
            if (vehName && vehName.trim().length > 0) {
                let pos = player.position
                pos.x += 3
                mp.vehicles.new(vehName, pos)
            } else {
                player.outputChatBox("Подсказка: /veh [id]")
            }
        }
    },
    {
        triggers: ["tppos"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: (player, _, x, y, z) => {
            if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z))){
                player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
            }
            else
                player.outputChatBox("Подсказка: /tppos [x] [y] [z]")
        }
    }
]