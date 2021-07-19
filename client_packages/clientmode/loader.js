const normalizedPath = require("path").join(__dirname);
require("fs").readdirSync(normalizedPath).forEach(file => {
    if(file != "loader.js"){
        require("./"+file)
    }
})