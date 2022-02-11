mp.events.add("anim.dance", () => {
    mp.game.streaming.requestAnimDict("switch@trevor@mocks_lapdance")
    mp.players.local.taskPlayAnim("switch@trevor@mocks_lapdance", "001443_01_trvs_28_idle_stripper ", 8.0, 1.0, -1, 1, 1.0, false, false, false)
})