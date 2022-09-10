"use strict"

import { Intents } from "discord.js"
import { Client, config } from "./imports"
import { data, Client as Cluster } from "discord-hybrid-sharding"
import cfonts from "cfonts"

const intents = new Intents(32767)

const client = new Client({
  shards: data.SHARD_LIST, // An array of shards that will get spawned
  shardCount: data.TOTAL_SHARDS,
  intents
})

client.cluster = new Cluster(client);
client.login(config.TOKEN_CANARY)


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

export default client
