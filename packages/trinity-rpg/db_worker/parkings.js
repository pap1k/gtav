const Parking = require("./db_models/Parking")

module.exports = {
    create: (vector) => {
        const p = new Parking({
            coords: {
                x: vector.x,
                y: vector.y,
                z: vector.z
            }
        })
        return p.save()
    },
    getAll: () => {
        return Parking.find()
    },
    update: (find, fields) => {
        return Parking.findOne({_id: find}, (e, doc) => {
            for(field in fields){
                doc[field] = fields[field]
            }
            doc.save()
        })
    }
}