const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FundoSchema = new Schema({
  _id: { type: String },
   guild: { type: String, default: '968570313027780638' },
  Price: { type: String },
  Image: {
      link: String,
      description: String,
      name: String,
      author: String,
  },
   ImgID: { type: String },
});

const Fundo = mongoose.model("Fundos", FundoSchema);
module.exports = Fundo;