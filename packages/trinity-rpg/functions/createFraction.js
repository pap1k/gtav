const Fractions = require("../db_worker/db_models/Fraction")
module.exports = {
    create: async (idx, name, pos) => {
        const f = await Fractions.find({idx})
        if(f.length == 0){
            const p = [{x: pos.x, y: pos.y, z: pos.z}]
            const newf = new Fractions({idx, name, spawnpoints: p})
            newf.save()
            return "Фракция "+name+" создана"
        }
        else
            return "Уже есть фракция с таким идом"
    },
    del: async (idx) => {
        const f = await Fractions.deleteOne({idx})
        if(f.ok){
            return "Фракция "+f+" удалена"
        }
        else
            return "Не найдена такая фракция"
    }
}