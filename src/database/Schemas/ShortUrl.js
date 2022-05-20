const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShortSchema = new Schema({
    short: { type: String, default: null },
    full: { type: String, default: null },
    clicks: { type: String, default: 0}
});

const Short = mongoose.model("Shorts", ShortSchema);
module.exports = Short;