
const players = require("../db_worker/players")
module.exports = (player, coords) => {
    players.updateDefault(player, {spawn: coords})
    player.setVariable('spawnpoint', new mp.Vector3(coords.x, coords.y, coords.z))
}