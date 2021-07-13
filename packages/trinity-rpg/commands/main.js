const normalizedPath = require("path").join(__dirname);
const utils = require("../utils")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if(file != "main.js"){
        var module = require("./" + file)
        utils.log("Loading "+file)
        if(module.obj){
            module.obj.forEach(cmd=>{

                if(!cmd.triggers) return utils.log("Error of loading "+file+" in commands. Cant find 'triggers' key.", "warn")
                if(!cmd.execute) return utils.log("Error of loading "+file+" in commands. Trigger: "+cmd.triggers[0]+" Cant find 'execute' key.", "warn")
                if(cmd.lvl == undefined) return utils.log("Error of loading "+file+" in commands. Trigger: "+cmd.triggers[0]+" Cant find 'lvl' key.", "warn")

                cmd.triggers.forEach(trigger => {
                    mp.events.addCommand(trigger, (player, ...params)=>{

                        if(player.getVariable('level') >= cmd.lvl){
                            //если в конструкторе указание количество параметров команды
                            if(cmd.args && params.length < cmd.args+1)
                                return cmd.hint ? player.outputChatBox("Подсказка: "+cmd.hint) : console.log("dick")

                            //если в конструкторе есть указание
                            if(cmd.target){
                                //если оно-таки есть, значит, параметров должно быть 2. Если нет то иди нахуй с подсказкой
                                if(params.length < 2)
                                    return cmd.hint ? player.outputChatBox("Подсказка: "+cmd.hint) : console.log("dick")

                                //чекаем на челика
                                const foundPlayer = findPlayerByIdOrNickname(params[1])

                                if (!foundPlayer)
                                    return player.outputChatBox("По указанным параметрам не найдено игроков")

                                if(foundPlayer.length)
                                    return player.outputChatBox("По указанным параметрам найдено несколько игроков")
                                
                                params[1] = foundPlayer
                            }
                            //TODO log using
                            cmd.execute(player, ...params)
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
