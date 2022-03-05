require("./clientmode/death")
require("./clientmode/PrettyTags")
require("./clientmode/reglog")
require("./clientmode/scoreboard")
require("./clientmode/statusBar")
require('./clientmode/dialogs')
<<<<<<< HEAD
// mp.gui.execute("window.location = 'package://browser/chat/index.html'");
// require('./clientmode/chat');

mp.gui.chat.show(false);

// Initialize chatbox CEF, mark it as default server chat
const chatbox = mp.browsers.new('package://browser/chat/index.html');
chatbox.markAsChat();
=======
require('./clientmode/chat')
require('./clientmode/audio3D')
require('./clientmode/customRadio')
require('./clientmode/shot-tp')
require('./clientmode/anims')
require('./clientmode/3dtext')
require('./clientmode/money')

//Disable ambient sounds
mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE")
>>>>>>> origin/master
