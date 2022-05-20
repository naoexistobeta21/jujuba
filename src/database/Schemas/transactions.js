const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
user: { type: mongoose.SchemaTypes.Number, default: 0},
transactions: {type: mongoose.SchemaTypes.Object, default: []},
});

module.exports = mongoose.model('transactions', guildConfigSchema);