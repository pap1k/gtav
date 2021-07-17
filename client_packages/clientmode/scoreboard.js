let browser = mp.browsers.new('package://browser/scoreboard/scoreboard.html');
browser.active = false;

const KEY_CODE = 0x72; // F3

mp.keys.bind(KEY_CODE, true, () => {
    browser.active = true;
});

mp.keys.bind(KEY_CODE, false, () => {
    browser.active = false;
});

mp.events.add('scoreboardUpdate', (players) => {
    browser.execute(`listClear();`); // сначало очистим таблицу от всех записей
    players.forEach(function(player) {
        browser.execute(`listAddPlayer(${player.id}, \'${player.name}\', ${player.ping});`); // построчно добавим всех игроков
    })
});