const parkings = require("../db_worker/parkings")
const utils = require("../utils")
const dtext = require("../functions/3dtext")

let loaded = []
let textids = []

async function load(){
    loaded = await parkings.getAll()
    loaded.forEach(park => {
        let textid = dtext.create3DText(`Parking [${park._id}], attached car [${park.carid}]`, 15, park.coords)
        textids.push(textid)
    })
    utils.log("Parkings loaded", "done")
}
load()
module.exports = {
    dtexts: () => textids,
    getLoaded: () => loaded,
    bindCar: (parkid, carid) => {
        loaded.forEach(c => {
            if (c._id == parkid)
                return c.carid = carid
        })
        return parkings.update({_id: parkid}, {carid})
    }
}