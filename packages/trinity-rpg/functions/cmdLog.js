let cmdlog = []
let chatlog = []

function add(type, nick, cmd, time, add){
    if(type == "CMD")
        cmdlog.push(
            {player: nick, cmd, time}
        )
    else if (type == "CHAT"){
        chatlog.push(
            {player: nick, cmd, time, add}
        )
    }
    return true
}
function get(type, nick, amount){
    let v = []
    if(type == "CMD")
        cmdlog.forEach(e => {
            if(e.player == nick)
                v.push(e)
        })
    if(type == "CHAT")
        chatlog.forEach(e => {
            if(e.player == nick)
                v.push(e)
        })
    return v.length > amount ? v.slice(v.length-amount) : v
}
module.exports = {add, get}