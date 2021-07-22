mp.events.add("playerChat", (message) =>{
    player.call('Send_ToChat', [message]);
});