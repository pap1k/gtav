const normalizedPath = require("path").join(__dirname);
const utils = require("../utils")
let cmdList = []
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
                    cmdList.push(trigger)
                    mp.events.addCommand(trigger, (player, ...params)=>{
                        if(player.getVariable('level') >= cmd.lvl){
                            //если в конструкторе указание количество параметров команды
                            if(cmd.args && params.length-1 < cmd.args)
                                return player.outputChatBox(cmd.hint ? "Подсказка: "+cmd.hint : "Передано неверное количество аргументов")

                            //если в конструкторе есть указание
                            if(cmd.target){
                                //если оно-таки есть, значит, параметров должно быть 2. Если нет то иди нахуй с подсказкой
                                if(params.length < 2)
                                return player.outputChatBox(cmd.hint ? "Подсказка: "+cmd.hint : "Передано неверное количество аргументов")

                                //чекаем на челика
                                const foundPlayer = utils.findPlayerByIdOrNickname(params[1])

                                if (!foundPlayer)
                                    return player.outputChatBox("По указанным параметрам не найдено игроков")

                                if(foundPlayer.length)
                                    return player.outputChatBox("По указанным параметрам найдено несколько игроков")
                                
                                params[1] = foundPlayer
                            }
                            params[0] = trigger
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

mp.events.add("playerCommand", (player, command) =>{
    const args = command.split(/[ ]+/);
	const commandName = args.splice(0, 1)[0];
    if(cmdList.indexOf(commandName) == -1)
        player.outputChatBox("SERVER: Неизвестная команда") 
})

mp.events.addCommand("cmd", (player) => {
    player.outputChatBox(cmdList.join(" "))
})