mp.events.add("InitiateCustomChat", () => {
    mp.gui.chat.show(false); 

    const chatbox = mp.browsers.new('package://browser/chat/chat.html');
    chatbox.markAsChat();
});