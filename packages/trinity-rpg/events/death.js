mp.events.add("playerDeath", (player, reason, killer) => {
    player.health = 100
    player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544))
})