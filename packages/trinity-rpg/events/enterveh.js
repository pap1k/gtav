function playerEnterVehicleHandler(player, vehicle, seat) {
    if(seat == 0)
        vehicle.setVariable("last_driver", player.getVariable("uid"))
}
 
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler)