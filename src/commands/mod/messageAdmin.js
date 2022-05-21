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
            name: 'message',
            description: '[ ✨ CRIADOR ] enviar mensagens a usuários donos de servidores.',
            options: [
                {
                    type: 'STRING',
                    name: 'servidor',
                    description: 'id do server',
                    required: true
        },
        {
            type: 'STRING',
            name: 'mensagem',
            description: 'msg pro user',
            required: true
}
            ]
        })
    }

    run = async (interaction) => {
    interaction.channel.sendTyping()
    if(interaction.user.id === '947856944515936306') {
        let msg = interaction.options.getString('mensagem')
        let server = this.client.guilds.cache.get(interaction.options.getString('servidor'))
        if(!server) return interaction.reply({ content: 'servidor nao encontrado', ephemeral: true})

        let user = this.client.users.cache.get(server.ownerId)
        
        try{
            user.send({ content: `*${msg}*\n\n-Mensagem oficial enviada por: ${interaction.user.tag}`})
        } catch(err) {
            interaction.reply({ content: 'erro', ephemeral: true})
        }
     } else interaction.reply({ content: 'você não pode usar esse comando!', ephemeral: true})
    }
    
}