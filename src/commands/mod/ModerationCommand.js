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
            name: 'moderation',
            description: '[ ⚙️ MOD ] Configure seu servidor.',
            options: [
                {
                    type: 'SUB_COMMAND',
                    name: 'dashboard',
                    description: '[ ⚙️ MOD ] Configure seu servidor do jeitinho certo'
                }
            ],
        }
       
        )
    }

    run = async (interaction) => {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Oxii, pra que você quer usar esse comando? nem admin você é!', ephemeral: true})
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/painel/${subCommand}`)(this.client, interaction)
    }
}