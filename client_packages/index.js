require("./clientmode/death")
require("./clientmode/PrettyTags")
require("./clientmode/reglog")
require("./clientmode/scoreboard")
require("./clientmode/statusBar")
require('./clientmode/dialogs')
// mp.gui.execute("window.location = 'package://browser/chat/index.html'");
// require('./clientmode/chat');

mp.gui.chat.show(false);

// Initialize chatbox CEF, mark it as default server chat
const chatbox = mp.browsers.new('package://browser/chat/index.html');
chatbox.markAsChat();