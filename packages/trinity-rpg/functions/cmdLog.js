let log = []

function add(nick, cmd, time){
    log.push(
        {player: nick, cmd, time}
    )
    return true
}
function get(amount){
    return log.slice(log.length-amount)
}
module.exports = {add, get}