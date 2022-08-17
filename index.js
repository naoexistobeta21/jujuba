require('dotenv').config()
const Discord = require('discord.js')
const Client = require('./src/structures/Client')
const fs = require('fs')
const User = require('./src/database/Schemas/User')
const Guild = require('./src/database/Schemas/Guild')
const Cluster = require('discord-hybrid-sharding');
const axios = require('axios')
const intents = new Discord.Intents(32767)


const client = new Client({
    shards: Cluster.data.SHARD_LIST, // An array of shards that will get spawned
    shardCount: Cluster.data.TOTAL_SHARDS,
    intents
})

client.cluster = new Cluster.Client(client);
client.login(process.env.TOKEN_CANARY)


const cfonts = require('cfonts');


process.on('unhandledRejection', (reason, p) => {
        console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');
        console.log(reason, p);
    });

process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
    }) 

process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ ANTICLASH ] | BLOQUEADO');
        console.log(err, origin);
    });

process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
    });

//OTYwMzQ0MDkwMjQxNzk4MTU1.GnSqSY.9n7uByWIV-WF5h7veTH_cbPrLeCXDE-R7gd-GY

//OTcwMTM0MDkwMTUyMDM0MzU0.Ym3hxw.-XcdNjaabHYKchcfgJxXJAZk9dM

module.exports = {
  Util: require("./src/util/index.js"),
  client: client
};

