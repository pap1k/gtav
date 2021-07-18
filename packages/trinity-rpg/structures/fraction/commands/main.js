const normalizedPath = require("path").join(__dirname);
const conf = require("./config.json")
const log = require("../../../functions/cmdLog").add
const utils = require("../../../utils")
let cmdList = []
require("fs").readdirSync(normalizedPath).forEach(file => {
    if(file != "main.js"){
        if(file.substring(file.length - 2) == "js"){
            const dick = require("./"+file)
            if(!dick.obj) return utils.log("Skipping epmty file", "info")
            dick.obj.forEach(cmd => {
                if(cmd.triggers === undefined) return utils.log("Error of loading "+file+". Cant find triggers key", "err")
                if(cmd.fraction === undefined) return utils.log("Error of loading "+file+". Cnat find fraction key", "err")
                if(cmd.execute === undefined) return utils.log("Error of loading "+file+". Cnat find execute key", "err")
                
                if(typeof(cmd.triggers) == "string")
                    cmd.triggers = [cmd.triggers]

                cmd.triggers.forEach(trigger => {
                    mp.events.addCommand(trigger, (player, ...params) => {
                        if(!(player.getVariable('fraction') == cmd.fraction || (cmd.fraction == conf.ANY && player.getVariable('fraction') != 0)))
                            return player.outputChatBox("Вы не можете использовать эту команду")
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

                        if(cmd.fulltext === undefined)
                            params[0] = trigger

                        if(cmd.text_non_empty && (!params[0] || params[0].trim() == ""))
                            return player.outputChatBox(cmd.hint ? "Подсказка: "+cmd.hint : "Текст не может быть пустым")
                        if(cmd.fulltext)
                            log("CHAT", player.name, trigger, Date.now(), params[0])
                        else
                            log("CMD", player.name, trigger, Date.now())
                        cmd.execute(player, ...params)
                    })
                })
            })
        }
    }
        
})