mp.events.add("playerDeath", (player, reason, killer) => {
    mp.game.graphics.startScreenEffect("DeathFailNeutralIn", 3000, false)
})