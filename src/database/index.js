const mongoose = require("mongoose");
const c = require("colors");
const mongoCurrency = require('discord-mongo-currency');

module.exports = {
  start() {
    try {
      
      mongoCurrency.connect(process.env.MONGO_URI);
      mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
      if (err) return console.log(c.red(`[ MONGODB ] - ERROR:`, +err));
    }
  },
};