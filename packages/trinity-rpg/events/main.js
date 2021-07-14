const normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if(file != "main.js")
        if(file.substring(file.length - 2) == "js")
            require("./"+file)
})