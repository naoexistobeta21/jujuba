//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const Admin = require('../../../packages/MongoDB/admin')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'admin',
            description: '[ ✨ CRIADOR ] adicionar/remover tag admin de usuários.',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que você vai add/remove',
                    required: true
        }
            ]
        })
    }

    run = async (interaction) => {
    interaction.channel.sendTyping()
    if(interaction.user.id === '947856944515936306') {
        
   
    let user = interaction.options.getUser('usuário')

    const yes = new MessageButton()
    .setCustomId('addAdmin')
    .setLabel('ADICIONAR')
    .setStyle('SUCCESS')

    const no = new MessageButton()
    .setCustomId('removeAdmin')
    .setLabel('REMOVER')
    .setStyle('DANGER')


    const row = new MessageActionRow().addComponents(yes, no)

    interaction.reply({
    content: `*Escolha uma opção`,
    components: [row],
    ephemeral: true
    })

         
    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'addAdmin') {
        Admin.add(i, user)
	} else if(i.customId === 'removeAdmin') {
        Admin.remove(i, user)
    }
});

collector.on('end', collected => {});
    } else return interaction.reply({ content: '*Você não pode user esse comando bobinho!*', ephemeral: true})
    
    
     }
    
}