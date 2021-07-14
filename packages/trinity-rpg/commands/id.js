var exports = module.exports = {}
const lvls = require("../lvls")
const {findPlayerByIdOrNickname} = require("../utils.js")
exports = [
    {
        triggers: ['id'],
        lvl: lvls.PLAYER,
        args: 1,
        execute: (player, _, arg) => {
            const foundplayer = findPlayerByIdOrNickname(arg)
            console.log(foundplayer, foundplayer.name)
            player.outputChatBox(foundplayer.name)
        }
    }
]