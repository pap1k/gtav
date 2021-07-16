const { spawn, exec } = require("child_process");
module.exports = () => {
    mp.players.broadcast("Администратор запустил программу по перезапуску сервера. Перезапуск через 5 секунд")
    setTimeout(() => {
        const subprocess = spawn(process.argv[1], process.argv.slice(2), {detached: true, stdio: ['ignore', out, err]})
        // exec("cmd /c start.bat ")
        subprocess.unref()

        process.exit()
    }, 5000)
}