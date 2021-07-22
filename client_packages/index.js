require("./clientmode/death")
require("./clientmode/PrettyTags")
require("./clientmode/reglog")
require("./clientmode/scoreboard")
require("./clientmode/statusBar")
require('./clientmode/dialogs')

mp.gui.chat.show(false);
const chatbox = mp.browsers.new('package://browser/chat/index.html');
chatbox.markAsChat();

// mp.gui.execute("window.location = 'package://browser/chat/index.html'");
// require('./clientmode/chat');