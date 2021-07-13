//init Commands file
require('./commands/main')
require("./reg-log")
//const db = require('./db')
const mongoose = require("mongoose")
const utils = require("./utils")
async function start(){
    try{
        await mongoose.connect(
            'mongodb+srv://papercut:A2XpDsrRuE7rHgX@gtavtest.j8y3y.mongodb.net/gtav',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifieldTopology: true
            }
        )
        utils.log("Подключение к БД успешно", "done")
    } catch(e){
        utils.log(e, "err")
    }
    
}
start()