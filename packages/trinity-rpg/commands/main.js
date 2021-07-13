const normalizedPath = require("path").join(__dirname);
const utils = require("../utils")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if(file != "main.js"){
        var module = require("./" + file)
        utils.log("Loading "+file)
        if(module.obj){
            module.obj.forEach(cmd=>{

                if(!cmd.triggers){ utils.log("Error of loading "+file+" in commands. Trigger: "+cmd.triggers[0]+" Cant find 'triggers' key.", "warn"); return;}
                if(!cmd.execute){ utils.log("Error of loading "+file+" in commands. Trigger: "+cmd.triggers[0]+" Cant find 'execute' key.", "warn"); return;}
                if(cmd.lvl == undefined){ utils.log("Error of loading "+file+" in commands. Trigger: "+cmd.triggers[0]+" Cant find 'lvl' key.", "warn"); return;}

                cmd.triggers.forEach(trigger => {
                    mp.events.addCommand(trigger, (player, fulltext, arg1, arg2, arg3, arg4)=>{
                        //TODO CHECK IF PLAYER HAS RIGHTS
                        if(true){
                            //TODO log using
                            cmd.execute(player, fulltext, arg1, arg2, arg3, arg4)
                        }
                        else
                            player.outputChatBox("У вас нет доступа к этой команде")
                    })
                })
            })
        }
        else
            utils.log("Error of loading "+file+" in commands. Check exports structure.", "warn")
    }
  });
utils.log("Команды проинициализированны", "done")