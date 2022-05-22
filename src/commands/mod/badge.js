const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const ms = require("ms")
const User = require('../../database/Schemas/User')
const Funcao = require('../../../packages/MongoDB/badge')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'badge',
            description: '[🛡️ EQUIPE ] Adicione badges a usuários',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que vai receber a badge',
                    required: true
        },
        {
            type: 'STRING',
            name: 'badge',
            description: 'badge que vc vai dar ao usuário',
            required: true
},
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        const user = interaction.options.getUser('usuário')
        let badge = interaction.options.getString('badge')
        Funcao.addBadge(interaction, user, badge)
    }
}