const c = require('colors')
const { ShardingManager } = require("discord.js")
const ShardId = (totalShards = 20) => {
  const manager = new ShardingManager(`./index.js`, {
    totalShards: totalShards,
    respawn: true,
  });

manager.spawn();
console.log(c.bgGreen(`[ SHARD MANAGER ] | TOTAL = ${manager.totalShards} | CLUSTER: ${process.uid}`))
       }


module.exports = ShardId;
