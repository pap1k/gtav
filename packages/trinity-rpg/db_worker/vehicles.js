const Vehicle = require("./db_models/Vehicle")

module.exports = {
    getAll: async () => {
        const v = await Vehicle.find()
        return v
    },
    getByUid: async (veh) => {
        
    },
    create: async (veh, uid) => {
        return new Vehicle({
            name: "CARCAR",
            owner: uid,
            vehType: veh
        })
    }
}