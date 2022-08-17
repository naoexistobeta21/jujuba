const Event = require('../../structures/Event')
const Money = require('discord-mongo-currency')
const Discord = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    run = async (oldMember, newMember) => {
        
    }
}