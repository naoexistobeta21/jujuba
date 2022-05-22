//<:bitcoin:970521426224353321>

const Command = require('./src/structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("./src/util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: '[ 🛡️ ADMIN ] gerencie seu servidor com o painel.',
            options: [
                {
                type: 'USER',
                name: 'usuário',
                description: 'usuário que tu vai mutar',
                required: true
                }
                ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        const user = interaction.options.getUser('usuário')
        if(interaction.guild.id !== '955133657830555728') return interaction.reply({ content: 'Esse comando é exclusivo do servidor ANGEL\'S', ephemeral: true})
        if(!user) return interaction.reply({ content: 'Você precisa escolher um usuário antes!', ephemeral: true})

        const button = new MessageButton()
        .setCustomId('primary')
        .setLabel('Canal de entrada')
        .setStyle('PRIMARY')

        const row = new MessageActionRow().addComponents(button)


         interaction.reply({
             content: ``,
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