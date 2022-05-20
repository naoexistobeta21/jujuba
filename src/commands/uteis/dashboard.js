//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'dashboard',
            description: '[ 🛡️ ADMIN ] gerencie seu servidor com o painel.',
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        if(interaction.user.id !== '947856944515936306') return interaction.reply({ content: 'comando em manutenção', ephemeral: true})
        const button = new MessageButton()
        .setCustomId('primary')
        .setLabel('Canal de entrada')
        .setStyle('PRIMARY')

        const row = new MessageActionRow().addComponents(button)


         interaction.reply({
             content: `teste`,
             components: [row]
         })
         interaction.channel.sendTyping()
         
         const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
        return console.log('primary')
	}
});

collector.on('end', collected => {});
     
    }
}