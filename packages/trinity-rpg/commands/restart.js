const lvls = require("../lvls")
var exports = module.exports = {}
exports.obj = [
    {
        triggers: ["forcerestart"],
        lvl: lvls.UNIQUE_LEVEL,
        execute: () => {
            const restart = require("../functions/restart")
            restart()
        }
    }
]