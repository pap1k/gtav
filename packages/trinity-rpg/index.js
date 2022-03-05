const db = require("./server-side-conf.json").db;
const mongoose = require("mongoose");
const utils = require("./utils");
async function start() {
  try {
    await mongoose.connect(
      `${db.protocol}://${db.user}:${db.password}@${db.server}/${db.db}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (e) => console.log(e)
    );
    utils.log("Database connection successful!", "done");
  } catch (e) {
    throw "Database connection failed!";
  }
}
start().then((v) => {
  require("./commands/main");
  require("./structures/fraction/commands/main");
  require("./events/main");
  require("./globals/loader");
  Player.prototype.outputChatBox = (msg) => player.call("Send_ToChat", msg);
});
