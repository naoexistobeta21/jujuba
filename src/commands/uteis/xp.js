
const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'xp',
            description: '[ ⚡ MISCELÂNEA ] Veja quanto de xp você tem.',
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()

         interaction.reply({
             content: `⚡ ┃ ${interaction.user}, você tem 0 de XP,  LVL 0 (+0 XP para próximo nível)`
         })
    }
}