//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const Black = require('../../../packages/MongoDB/blacklist')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'blacklist',
            description: '[ 🛡️ EQUIPE ] Adicionar usuários na blacklist.',
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
    const admin = await User.findOne({ IdU: interaction.user.id })
    if(admin.perm === true) {
        
   
    let user = interaction.options.getUser('usuário')

    const yes = new MessageButton()
    .setCustomId('addBlack')
    .setLabel('ADICIONAR')
    .setStyle('SUCCESS')

    const no = new MessageButton()
    .setCustomId('removeBlack')
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
	if (i.customId === 'addBlack') {
        Black.add(interaction.user, i, user)
	} else if(i.customId === 'removeBlack') {
        Black.remove(interaction.user, i, user)
    }
});

collector.on('end', collected => {});
    } else return interaction.reply({ content: '*Você não pode user esse comando bobinho!*', ephemeral: true})
    
    
     }
    
}