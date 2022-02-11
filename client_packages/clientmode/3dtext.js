let todraw = []

function findElemId(id){
    for(let i =0; i < todraw.length; i++){
        if(todraw[i].id == id)
            return i
    }
    return -1
}

// elem = {
//     id: 1, - unique
//     pos: {x: 0, y: 0, z: 0}, - Vector3d - text placement
//     drawdist: 10, - distance from which player will see text
//     text: "Top text in the world" - displayable text
// }
mp.events.add('show3dtext', elem => {
    elem = JSON.parse(elem)
    if(elem.id !== undefined && elem.pos && elem.drawdist && elem.text){
        if(findElemId(elem.id) == -1)
            todraw.push(elem)
        else
            mp.gui.chat.push("[error] can't push 3dtext with existing id ("+elem.id+"), already exsist "+findElemId(elem.id))
    }
})

mp.events.add('delete3dtext', elem => {
    mp.gui.chat.push(elem)
    elem = JSON.parse(elem)
    if(elem.id !== undefined){
        const idx = findElemId(elem.id)
        mp.gui.chat.push("deleting now 3d with id [" + elem.id +"], id in array ["+idx+"]") 
        if(idx != -1)
            todraw.splice(idx, 1)
        else
            mp.gui.chat.push("[error] idx of elem = "+idx+", elems count = "+todraw.length)
    }
})

mp.events.add('render', () => {
    todraw.forEach(elem => {
        if(elem.id && elem.pos && elem.drawdist && elem.text){
            const lp = mp.players.local
            const distance = mp.game.gameplay.getDistanceBetweenCoords(elem.pos.x, elem.pos.y, elem.pos.z, lp.position.x, lp.position.y, lp.position.z, false)
            if(distance <= elem.drawdist)
                mp.game.graphics.drawText(
                    elem.text,
                    [elem.pos.x, elem.pos.y, elem.pos.z],
                {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [0.4, 0.4],
                outline: true
                })
        }
    })
})