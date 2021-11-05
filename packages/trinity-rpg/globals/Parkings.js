const parkings = require("../db_worker/parkings")
const utils = require("../utils")

let loaded = {}

async function load(){
    loaded = await parkings.getAll()
    utils.log("Parkings loaded", "done")
    console.log(loaded)
}
load()
module.exports = loaded