const Vehicle = require("./db_models/Vehicle")

module.exports = {
    getAll: async () => {
        const v = await Vehicle.find()
        return v
    },
    getByUid: async (uid) => {
        
    },
    create: async (veh, owner, vehname) => {
        const cfg = {
            name: vehname,
            spawned: true,
            owner: owner,
            vehType: veh
        }
        new Vehicle(cfg)
        return cfg
    }
}