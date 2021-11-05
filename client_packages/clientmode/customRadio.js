mp.events.add("playRadio", () => {
    mp.game.audio.playSound3D(
            "http://rpgv.ru/hello.mp3",
            mp.players.local.position,
            30
        )
})