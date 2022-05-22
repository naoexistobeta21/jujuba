const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FundoSchema = new Schema({
  user: { type: String, default: '1010'},
  price: { type: Number },
  image: {
      link: String,
      description: String,
      name: String,
  },
});

const Fundo = mongoose.model("Fundos", FundoSchema);
module.exports = Fundo;