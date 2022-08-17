const Event = require('../../structures/Event')
const Money = require('discord-mongo-currency')
const Discord = require('discord.js')
const { AuditLOG } = require('../../../packages/Webhook')
const Guild = require('../../database/Schemas/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'emojiCreate'
        })
    }

    run = async (emoji) => {
        const guild = await Guild.findOne({ server: emoji.guild.id})
        const t = this.client.guilds.cache.get(emoji.guild.id)
        if(guild) {
        const log = new AuditLOG(guild, this.client, t)

        log.send({title: 'Emoji criado!', description: `**__Tipo:__** ${emoji.animated ? 'Animado' : 'Normal'}\n**__Nome:__** ${emoji.name} (${emoji.id})\n**__Menção:__** <:${emoji.name}:${emoji.id}> \`<:${emoji.name}:${emoji.id}>\``, color: 'BLUE'})
        }

    }
}