const Player = require("../db_models/Player")
module.exports = (player, coords) => {
    const p = Player.findOne({name: player.name})
    p.update({spawn: coords})
    player.setVariable('spawnpoint', new mp.Vector3(coords.x, coords.y, coords.z))
}