const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'profile',
            description: '[✨ PROFILE ] Veja as informações do profile.',
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'view',
                    description: '[✨ PROFILE ] Veja o profile dos usuários.',
                    options: [
                        {
                            type: 'USER',
                            name: 'user',
                            description: 'Qual usuário você quer ver?',
                            required: false
                        }
                    ]
        },
        {
                    
            type: 'SUB_COMMAND',
            name: 'aboutme',
            description: '[✨ PROFILE ] Mude sua descrição!',
            options: [
                {
                    type: 'STRING',
                    name: 'text',
                    description: 'Escreva algo fofo, ok?',
                    required: true
                }
            ]
},
{
    type: 'SUB_COMMAND',
    name: 'reputation',
    description: '[✨ PROFILE ] Agradeça aos seus amigos!',
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Agradeça alguém pelo seu esfoço!',
            required: true
        },
        {
            type: 'STRING',
            name: 'text',
            description: 'Envie um textinho bunitinho para ele <3',
            required: false
        }
    ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'background',
    description: '[✨ PROFILE ] Mude/edit/buy seus backgrounds!',
},
{
                    
    type: 'SUB_COMMAND',
    name: 'marry',
    description: '[✨ PROFILE ] Case com seu crush, ou seja rejeitad@',
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Quem é @ sortud@ ?',
            required: true
        }
    ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'divorce',
    description: '[✨ PROFILE ] Divorcie um amor que não deu certo',
}
            ]
        })
    }

    run = async (interaction) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/profile/${subCommand}`)(this.client, interaction)
    }
}