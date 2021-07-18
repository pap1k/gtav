mp.events.add('Send_ToChat', (message) =>{
    mp.gui.chat.push(`${message}`);
});