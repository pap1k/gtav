//Allows set HP
const utils = require('../utils.js')

mp.events.addCommand('hp', (player) => {
    player.health = 100
    player.outputChatBox("Вы были вылечены")
})
mp.events.addCommand('sethp', (player, fullcmd, target, hp) => {
    if(target && hp){
        hp = parseInt(hp)
        if(isNaN(hp) || (hp < 0 && hp > 100))
            return player.outputChatBox("Количество HP должно быть числом от 0 до 100")

        const foundPlayer = utils.findPlayerByIdOrNickname(target)
        console.log(foundPlayer, foundPlayer.name)
        if (!foundPlayer)
            return player.outputChatBox("По указанным параметрам не найдено игроков")
        if(foundPlayer.length)
            return player.outputChatBox("По указанным параметрам найдено несколько игроков")

        foundPlayer.health = parseInt(hp)
        player.outputChatBox("Вы установили HP игрока "+foundPlayer.name+" на "+hp)
    }
    else
        player.outputChatBox("Подсказка: /sethp [ID или часть ника] [количество HP]")   
})