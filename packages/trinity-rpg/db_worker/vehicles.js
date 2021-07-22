const Vehicle = require("/db_models/Vehicle")

module.exports = {
    getAll: async () => {
        const vehs = await Vehicle.find()
        return vehs
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