const Vehicle = require("./db_models/Vehicle")

module.exports = {
    getAll: () => {
        return Vehicle.find()
    },
    getByUid: async (uid) => {
        
    },
    create: async (veh, owner, vehname) => {
        const v = await new Vehicle({
            name: vehname,
            spawned: true,
            owner: owner,
            vehType: veh
        }).save()
        console.log(v)
        return v
    }
}