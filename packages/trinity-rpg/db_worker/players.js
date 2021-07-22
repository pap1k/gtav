const Player = require("./db_models/Player")

module.exports = {
    updateCustomByUid: function (player, fields){
        Player.findOne({_id: player.getVariable("uid")}, (e, doc) => {
            for(field in fields){
                doc[field] = player.getVariable(field)
            }
            doc.save()
        })
    },
    
    updateDefault: function (player, fields){
        Player.findOne({_id: player.getVariable("uid")}, (e, doc) => {
            for(field in fields){
                doc[field] = fields[field]
            }
            doc.save()
        })
    },
    
    getByUid: async function (player){
        const o  = await Player.findOne({_id: player.getVariable("uid")})
        return o
    },
    
    getByName: async function (player){
        const o  = await Player.findOne({name: player.name})
        return o
    }
}
