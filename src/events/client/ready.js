const Event = require('../../structures/Event')
const c = require('colors')
const { AdventureTime } = require('../../../games/adventureTime')
const { Player } = require('../../../games/players')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        this.client.registryCommands()
        this.client.user.setStatus("online")
        
        const dbIndex = require("../../database/index");
        dbIndex.start();

        this.client.guilds.cache.forEach((guild) => {
            this.client.user.setActivity(`Adventure Time! Cluster ${this.client.cluster.id} [${guild.shardId}]`, { type: "PLAYING", shardId: guild.shardId }) 
        })

        setInterval(() => {
            this.client.guilds.cache.forEach((guild) => {
                this.client.user.setActivity(`Adventure Time! Cluster ${this.client.cluster.id} [${guild.shardId}]`, { type: "PLAYING", shardId: guild.shardId }) 
            })
        }, 20 * 60000)
/*
        let players = []
        let channel = this.client.channels.cache.get('1003321650307153960')
        
        if(channel) {
            this.client.adv = new AdventureTime(players, channel)
            await this.client.adv.start(channel)
            setInterval(async () => {
                await this.client.adv.next(channel)
                await this.client.adv.start(channel)
            }, 60000 * 18) //1080000
        }*/
    }
}