const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  IdU: { type: String },
  IdS: { type: String },
  Premium: { type: String },
  blacklist: { 
      status: { type: Boolean, default: false},
      time: { type: Number, default: new Date() },
      motivo: { type: String, default: 'nada ainda'}
  },
  perm: { type: Boolean, default: false },
  reps: {type: Number, default: 0},
  daily: { type: Number, default: 0 },
  work: { type: Number, default: 0 },
  vip: { type: Number, default: 0 },
  repTime: { type: Number, default: 0 },
  backgrounds: {
        back_01: { type: String, default: 'off' },
        back_02: { type: String, default: 'off' },
        back_03: { type: String, default: 'off'}
    },
  marry: {
    status: { type: String },
    parent: { type: String },
    time: { type: Date, default: new Date() },
    kidOne: { type: String },
    kidTwo: { type: String },
    kidThree: { type: String },
  },
  profile: {
    background: { type: String, default: 'https://cdn.discordapp.com/attachments/886351055456194571/886351745117220894/images.png'},
    sobremim: { type: String, default: 'Para personalizar use /user sobremim [texto]'},
  },
  Infoban: { type: String },
  afk: { type: String },
  afkMessage: { type: String },
  ticket: { type: String },
  message: { type: String, default: 0 }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;