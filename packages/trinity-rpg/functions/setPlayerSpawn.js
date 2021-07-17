const Plaeyr = require("../db_models/Player")
module.exports = (player, coords) => {
    const p = Player.findOne({name: player.name})
    p.update({spawn: coords})
}