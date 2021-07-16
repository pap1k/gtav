function getScoreboardList(){
    let list = new Array();
    mp.players.forEach((player) => {
            list.push({id: player.id, name: player.name, ping: player.ping});
    });
    return list;
}