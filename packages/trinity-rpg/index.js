//init Commands file
require('./commands/main')
require("./events/main")
const db = require("./server-side-conf.json").db
//const db = require('./db')
const mongoose = require("mongoose")
const utils = require("./utils")
async function start(){
    try{
        await mongoose.connect(
            `${db.protocol}://${db.user}:${db.password}@${db.server}/${db.db}`,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        , e => console.log(e))
        utils.log("Подключение к БД успешно", "done")
    } catch(e){
        throw "Пизда с БД"
    }
    
}
start()