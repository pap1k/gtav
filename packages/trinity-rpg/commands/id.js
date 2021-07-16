var exports = module.exports = {}
const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils.js")
exports.obj = [
    {
        triggers: ['id'],
        lvl: lvls.PLAYER,
        args: 1,
        hint: "/id [id или часть ника]",
        execute: (player, _, arg) => {
            const foundplayer = findPlayerByIdOrNickname(arg)
            console.log(foundplayer, foundplayer.name)
            player.outputChatBox(`${foundplayer.name} ID ${foundplayer.id}`)
        }
    }
]