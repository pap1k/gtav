mp.events.add("Send_ToChat", (message) => {
  mp.gui.chat.push(`${message}`);
});
mp.gui.execute("window.location = 'package://browser/chat/index.html'");
