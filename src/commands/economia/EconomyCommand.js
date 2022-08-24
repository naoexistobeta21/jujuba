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
            name: 'economy',
            description: '[🪙 ECONOMIA ] Sistema de economia simples.',
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'daily',
                    description: '[🪙 ECONOMIA ] Pegue caramelos diários.',
                },
                {
                    type: 'SUB_COMMAND',
                    name: 'top',
                    description: '[🪙 ECONOMIA ] Veja a lista de caramelos',
                    options: [
                        {
                            type: 'NUMBER',
                            name: 'page',
                            description: 'Qual é a pagina?',
                            required: false,
                            maxValue: 2,
                            minValue: 1
                        }
                    ]
                },
{
                    
    type: 'SUB_COMMAND',
    name: 'pay',
    description: '[🪙 ECONOMIA ] Pague usuários ou doe para pobres.',
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Qual usuário você quer pagar?',
            required: true
        },
        {
            type: 'NUMBER',
            name: 'value',
            description: 'Qual o valor?',
            minValue: 10,
            required: true
        }
    ]
},
{
    type: 'SUB_COMMAND',
    name: 'drop',
            description: '[ 🪙 ECONOMIA ] Drop caramelos pro povo.',
            options: [
                {
                    type: 'NUMBER',
                    name: 'valor',
                    description: 'valor a ser dropado',
                    minValue: 1000,
                    maxValue: 100000000,
                    required: true
        }
            ]
        },
{
                    
    type: 'SUB_COMMAND',
    name: 'battle',
    description: '[🪙 ECONOMIA ] Crie uma batalha valendo caramelos!',
    options: [
        {
            type: 'NUMBER',
            name: 'valor',
            description: 'Qual o valor da aposta?',
            minValue: 1000,
            required: true
        },
        {
            type: 'NUMBER',
            name: 'maximo',
            description: 'Qual o maximo de pessoas?',
            minValue: 2,
            maxValue: 30,
            required: false
        }
    ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'view',
    description: '[🪙 ECONOMIA ] Veja quantos caramelos você tem',
    options: [
        {
            type: 'USER',
            name: 'usuário',
            description: 'Qual usuário você quer ver?',
            required: false
        }
    ]
},
{
    type: 'SUB_COMMAND',
    name: 'cooldowns',
    description: '[ 🪙 ECONOMIA ] Veja seus tempos para usar certos comandos!'
},
{
    type: 'SUB_COMMAND',
    name: 'coinflip',
    description: '[ 🪙 ECONOMIA ] Aposte com seus amigos.',
    options: [
        {
            type: 'USER',
            name: 'usuário',
            description: 'usuário para apostar',
            required: true
        },
        {
            type: 'NUMBER',
            name: 'valor',
            description: 'valor do coinflip',
            maxValue: 500000000,
            minValue: 1000,
            required: true
        }
            ]
}
            ]
        })
    }

    run = async (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/economy/${subCommand}`)(this.client, interaction, t)
    }
}

