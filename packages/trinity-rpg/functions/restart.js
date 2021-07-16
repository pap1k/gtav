const { exec } = require("child_process");
module.exports = () => {
    mp.players.broadcast("Администратор запустил программу по перезапуску сервера. Сервер перезапустится через 5 секунд")
    setTimeout(() => {
        exec("./restart.bat")
    }, 5000)
}