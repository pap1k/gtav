//init Commands file
require('./commands/main')
require("./reg-log")
const db = require("./server-side-conf.json").db
//const db = require('./db')
const mongoose = require("mongoose")
const utils = require("./utils")
async function start(){
    try{
        await mongoose.connect(
            `mongodb+srv://${db.user}:${db.password}@gtavtest.j8y3y.mongodb.net/gtav`,
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