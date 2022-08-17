//require('os').cpus().length;

const Cluster = require('discord-hybrid-sharding');

const manager = new Cluster.Manager(`${__dirname}/index.js`, {
    totalShards: 1,
    shardsPerClusters: 1,
    totalClusters: 1,
    mode: 'process',
    token: process.env.TOKEN_CANARY,
});


manager.on('clusterCreate', (cluster) => {
  console.log(`Cluster ${cluster.id} iniciado`)
});
manager.spawn({ timeout: -1 });

