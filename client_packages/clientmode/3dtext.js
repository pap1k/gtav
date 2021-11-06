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
mp.events.add('show3dtext', elem =>{
    elem = JSON.parse(elem)
    if(elem.id && elem.pos && elem.drawdist && elem.text){
        if(findElemId(elem.id) == -1)
            todraw.push(elem)
        mp.gui.chat.push("[error] cant push 3dtext with existing id ("+elem.id+")")
    }
    else{
        if(elem.id){
            const idx = findElemId(elem.id)
            if(elem != -1)
                todraw.splice(idx, 1)
            else
                mp.gui.chat.push("[error] idx of elem = "+idx+", elems count = "+todraw.length)
        }
    }
})

mp.events.add('render', () => {
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);
    
    todraw.forEach(elem => {
        if(elem.id && elem.pos && elem.drawdist && elem.text){
            const distance = mp.game.player.distance(new mp.Vector3(elem.pos.x, elem.pos.y, elem.pos.z))
            let scale = (distance / elem.drawlist)
            if(scale < 0.6) scale = 0.6

            elem.pos.y -= scale * (0.0008 * (screenRes.y / 1080))
            mp.game.graphics.drawText(
                elem.text,
                [x, y],
            {
              font: 4,
              color: [255, 255, 255, 255],
              scale: [0.4, 0.4],
              outline: true
            })
        }
    })
})