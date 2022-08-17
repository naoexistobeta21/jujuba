const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ChatSchema = new Schema({
    user: { type: String },
    actions: { type: Array, default: [] },
    status: {
        count: { type: Number, default: 0 },
        sell: { type: Number, default: 0},
        buy: { type: Number, default: 0 },
        perdidos: { type: Number, default: 0 },
        ganhos: { type: Number, default: 0 },
    }
});

const Chat = mongoose.model("brokers", ChatSchema);
module.exports = Chat;