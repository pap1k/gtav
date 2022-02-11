mp.events.add("playerDeath", (player, reason, killer) => {
    setTimeout(() => {
        player.health = 100
        player.spawn(player.getVariable('spawnpoint'))
    }, 3000)
})