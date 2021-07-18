const { exec } = require("child_process");
module.exports = () => {
    mp.players.broadcast("Администратор запустил программу по перезапуску сервера. Перезапуск через 5 секунд")
    setTimeout(() => {
        exec("C:\\RAGEMP\\server-files\\gtav\\restart.bat")
    }, 5000)
}