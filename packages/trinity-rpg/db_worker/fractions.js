const Fraction = require("./db_models/Fraction")

module.exports = {
    update: (idx, fields) => {
        Fraction.findOne({idx}, (e, doc) => {
            for(field in fields){
                if(typeof fields[field] == "object"){
                    switch(fields[field].f){
                        case "push":
                            doc[field].push(fields[field].v)
                            break
                        default:
                            console.log("не найден кейс дл указанной функции (db_worker/fractions.js:update)")
                            break
                    }
                }
                else
                    doc[field] = fields[field]
            }
            doc.save()
        })
    },

    getAll: async () => {
        const o  = await Fraction.find()
        return o
    },

    getByIdx: async idx => {
        const o  = await Fraction.findOne({idx})
        return o
    }
}
