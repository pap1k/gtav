const Player = require("./db_models/Player")

module.exports = {
    updateCustomByUid: async function (player, fields){
        const p = await Player.findOne({_id: player.getVariable("uid")}, (e, doc) => {
            for(field in fields){
                doc[field] = player.getVariable(fields[field])
            }
            doc.save()
        })
    },
    
    updateDefault: function (player, fields){
        Player.findOne({uid: player.getVariable("uid")}, (e, doc) => {
    
        })
    },
    
    getByUid: async function (player){
        const o  = await Player.findOne({uid: player.getVariable("uid")})
        return o
    },
    
    getByName: async function (player){
        const o  = await Player.findOne({name: player.name})
        return o
    }
}
