const maxDistance = 25*15;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const color = [255,255,255,255];

let playerColors = { }

mp.nametags.enabled = false;

mp.events.add('updatePlayerColor', (id, color) => {
    playerColors[id] = color
})

mp.events.add('render', (nametags) => {
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);
	
    nametags.forEach(nametag => {
        let [player, x, y, distance] = nametag;
		
        if(distance <= maxDistance) {	   
            let scale = (distance / maxDistance);
            if(scale < 0.6) scale = 0.6;
			
            const health = player.getHealth() / 100;
		   
            const armour = player.getArmour() / 100;
			
            y -= scale * (0.0008 * (screenRes.y / 1080));
			
            mp.game.graphics.drawText(player.name, [x, y],
            {
              font: 4,
              color: isNaN(playerColors[player.id]) ? [255, 255, 255, 255] : playerColors[player.id],
              scale: [0.4, 0.4],
              outline: true
            });
			
            if(mp.game.player.isFreeAimingAtEntity(player.handle)) {
                let y2 = y + 0.042;
				
                if(armour > 0) {	
                    graphics.drawRect(x, y2, width + border * 2, 0.0085, 0, 0, 0, 200);
                    graphics.drawRect(x, y2, width, height, 150, 150, 150, 255);
                    graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, 244, 87, 114, 200);

                    y2 = y2 - height-0.0025;
				   
                    graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                    graphics.drawRect(x, y2, width, height, 41, 66, 78, 255);
                    graphics.drawRect(x - width / 2 * (1 - armour), y2, width * armour, height, 255, 255, 255, 200);
                }
                else {
                    graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                    graphics.drawRect(x, y2, width, height, 150, 150, 150, 255);
                    graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, 244, 87, 114, 255);
                }
            }
        }
    })
})