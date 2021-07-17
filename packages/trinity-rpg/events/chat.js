mp.events.add("outputChatBox", (message) =>{
    player.call('Send_ToChat', message);
});