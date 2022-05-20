const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'update',
            description: 'atualizações, apenas meus desenvolvedores usam isso.'
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        interaction.reply({
            content: 'error: host is not available',
            ephemeral: true
        })
    }
}