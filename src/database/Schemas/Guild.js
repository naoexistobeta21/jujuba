const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GuildSchema = new Schema({
  IdG: { type: String },
  infoban: { type: String, default: 'nenhum'},
  ownerid: { type: String, default: '3243' },
  chat: { type: String, default: 'off'},
  Prefix: { type: String, default: 'n!'},
  antilink: { type: String, default: 'off'},
  Logs: { type: String, default: 'off'},
  Premium: { type: String, default: 'off'},
  blacklist: { type: String, default: 'off'},
  LogsChannel: { type: String, default: null},
  language: { type: String, default: 'pt'},
  ping: { type: String, default: 'off'},
  welcome: {
    channel: { type: String, default: null},
    autorole: {
      cargo: { type: String, default: null},
      status: { type: String, default: null}
    }
  },
  leave: {
    channel: { type: String, default: null},
  },
  akinator: {
    canal: { type: String, default: null},
    stats: { type: String, default: 'off'},
  },
  autocat: { 
    status: { type: String, default: 'on' },
    channel: { type: String, default: 'nenhum' }
  },
});

const Guild = mongoose.model("Guilds", GuildSchema);
module.exports = Guild;