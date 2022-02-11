const lvls = require("../lvls")
module.exports = {
    obj: [
        {
            triggers: ["save"],
            lvl: lvls.TESTER,
            fulltext: true,
            args: 1,
            hint: "/save [комментарий]",
            execute: (player, _) => {
                const fs = require('fs');
                const data = "\n=============\n"+player.position.x+" "+player.position.y+" "+player.position.z+"\n"+_
                fs.appendFile("pos.txt", data, "utf-8", (err) => {
                    if (err) player.outputChatBox("Ошибка записи")
                    else player.outputChatBox("Позиция сохранена")
                })
            }
        }
    ]
}