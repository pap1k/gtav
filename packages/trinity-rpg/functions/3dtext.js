const utils = require("../utils")
let dtexts = []
// elem = {
//     id: 1, - unique
//     pos: {x: 0, y: 0, z: 0}, - Vector3d - text placement
//     drawdist: 10, - distance from which player will see text
//     text: "Top text in the world" - displayable text
// }
module.exports = {
    getList: () => dtexts,
    create3DText: (text, show_distance, position) => {
        const len = dtexts.push({
            text,
            drawdist: show_distance,
            pos: {x: position.x, y: position.y, z: position.z}
        })
        return len-1
    },
    show3DText: (textId, playerId) => {
        if(mp.players[playerId])
            mp.players[playerId].call("show3dText", JSON.stringify(dtexts[textId]))
        else
            utils.log("Can't send 3dtext["+textid+"] to player ["+playerId+"]")
    },
    delete3DText: (textId, playerId) => {
        if(mp.players[playerId])
            mp.players[playerId].call("show3dText", JSON.stringify({id: textId}))
        else
            utils.log("Can't send delete 3dtext["+textid+"] to player ["+playerId+"]")
    }
}