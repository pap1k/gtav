const parkings_db = require("../db_worker/parkings")
const parks = require("../globals/parkings")
const colors = require("../chat-colors.json")
const lvls = require("../lvls")
const dtext = require("../functions/3dtext")

module.exports = { obj:
[
    {triggers: "createparking",
        lvl: lvls.TESTER,
        execute: async player => {
            const r = await parkings_db.create(player.position)
            player.outputChatBox("Паркинг создан. ID: "+r._id)
        }
    },
    {triggers: ["parkinfo", "pinfo"],
        lvl: lvls.TESTER,
        execute: player => {
            let closest
            let lastdist
            parks.getLoaded().forEach(parking => {
                let dist = player.dist(new mp.Vector3(parking.coords.x, parking.coords.y, parking.coords.z))
                if(!closest)
                    closest = parking
                else
                    if(dist < lastdist)
                        closest = parking
                lastdist = dist
            })
            if(closest && player.dist(new mp.Vector3(closest.coords.x, closest.coords.y, closest.coords.z))){
                player.outputChatBox(`Parking [${closest._id}], attached car [${closest.carid}]`)
            }
            else
                player.outputChatBox(colors.GREY+"Поблизости не найдено парковок")
        }
    },
    {triggers: ["parkinfo3d", "pinfo3d"],
        lvl: lvls.TESTER,
        execute: player => {
            let v = player.getVariable("parks3d") ? true : false
            textids = []
            if(v){
                player.setVariable("parks3d", false)
                parks.dtexts().forEach(dtextid => dtext.delete3DText(dtextid, player.id))
                player.outputChatBox("Отображение парковок выключено")
            }
            else{
                player.setVariable("parks3d", true)
                parks.dtexts().forEach(dtextid => dtext.show3DText(dtextid, player.id))
                player.outputChatBox("Отображение парковок включено")
            }
        }
    },
    {triggers: "bindvehtopark",
        lvl: lvls.TESTER,
        execute: player => {
            if(player.vehicle){
                let closest
                let lastdist
                parks.getLoaded().forEach(parking => {
                    let dist = player.vehicle.dist(new mp.Vector3(parking.coords.x, parking.coords.y, parking.coords.z))
                    if(!closest)
                        closest = parking
                    else
                        if(dist < lastdist)
                            closest = parking
                    lastdist = dist
                })
                if(closest && player.vehicle.dist(new mp.Vector3(closest.coords.x, closest.coords.y, closest.coords.z))){

                    parks.bindCar(closest._id, player.vehicle.getVariable("uid"))
                    player.outputChatBox("Автомобить ["+player.vehicle.getVariable("uid")+"] привязан к парковке ["+closest._id+"]")
                }
                else
                    player.outputChatBox(colors.GREY+"Не найдено паркингов поблизости")
            }
            else
                player.outputChatBox(colors.GREY+"Вы должын находиться за рулем ТС")
        }
    }
]
}

