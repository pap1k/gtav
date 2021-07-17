const lvls = require("../lvls")
module.exports = {
    obj: [
        {
            triggers: ["save"],
            lvl: lvls.TESTER,
            execute: (player) => {
                console.log(player.position)
                player.outputChatBox(" Позиция в логе")
            }
        }
    ]
}