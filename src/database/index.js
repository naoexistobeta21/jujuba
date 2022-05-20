const mongoose = require("mongoose");
const c = require("colors");
const mongoCurrency = require('discord-mongo-currency');

module.exports = {
  start() {
    try {
      
      mongoCurrency.connect('mongodb+srv://admin:admin@cluster0.uc0cy.mongodb.net/banksarty?retryWrites=true&w=majority');
      console.log(c.red('[ ECONOMIA ] - SISTEMA CARREGADO'))

      mongoose.connect('mongodb+srv://admin:admin@cluster0.uc0cy.mongodb.net/banksarty?retryWrites=true&w=majority');

      console.log(c.red(`[ MONGODB ] - CONECTADO A DATABASE.`));
    } catch (err) {
      if (err) return console.log(c.red(`[ MONGODB ] - ERROR:`, +err));
    }
  },
};