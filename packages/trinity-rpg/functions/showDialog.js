module.exports = function show(player, style, title, data){
    console.log(data)
    data = JSON.stringify(data).replace(/'/g, "\\'").replace(/"/g, '\\"')
    
    console.log(data)
    player.call("showDialog", [style, title, data])
}