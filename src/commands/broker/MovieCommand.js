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
            name: 'movie',
            description: '[ 📽️ MOVIE ] Pesquise por seus filmes.',
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'search',
                    description: '[ 📽️ MOVIE ] Pesquise por seus filmes.',
                    options: [
                        {
                            type: 'STRING',
                            name: 'name',
                            description: 'digite o nome do filme/serie',
                            required: true
                        }
                    ]
        },
{
                    
    type: 'SUB_COMMAND',
    name: 'recomend',
    description: '[ 📽️ MOVIE ] Veja o filme recomenda da semana!',
}
            ]
        })
    }

    run = async (interaction) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/movie/${subCommand}`)(this.client, interaction)
    }
}