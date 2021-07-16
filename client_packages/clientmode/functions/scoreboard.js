function getScoreboardList(){
    let list = new Array();
    mp.players.forEach((player) => {
            list.push({id: player.id, name: player.name, ping: player.ping});
    });
    return list;
}
function updateScoreboard(){
    mp.players.call("scoreboardUpdate", [ getScoreboardList() ] );
}

mp.events.add('playerJoin', () => {
    updateScoreboard();
});

mp.events.add("playerQuit", () => {
    updateScoreboard();
});

setInterval(() => updateScoreboard(), 3000);