module.exports = function show(player, style, title, data){
    data = JSON.stringify(data).replace(/'/g, "\\'").replace(/"/g, '\\"')
    player.call("showDialog", [style, title, data])
}