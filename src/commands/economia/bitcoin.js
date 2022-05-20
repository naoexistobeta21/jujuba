//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'caramelos',
            description: '[🪙 ECONOMIA ] Veja quantos caramelos você ou um usuário tem.',
            options: [
                {
                            type: 'USER',
                            name: 'usuário',
                            description: 'usuário para ver a carteira',
                            required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        
        interaction.channel.sendTyping()
    
    const user = interaction.options.getUser('usuário') || interaction.user;

    const coins = await bitcoin.findUser(user.id, '968570313027780638')
        if(coins) {
            if(user.id === interaction.user.id) {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> **| Você tem ${Utils.toAbbrev(coins.coinsInWallet)} (\`${coins.coinsInWallet}\`) caramelos**`,
                    ephemeral: false
                })
            } else {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> **| ${user} tem ${Utils.toAbbrev(coins.coinsInWallet)} (\`${coins.coinsInWallet}\`) caramelos**`,
                    ephemeral: false
                })
            }
        } else {
            bitcoin.createUser(user.id, '968570313027780638')
            if(user.id === interaction.user.id) {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> **| Você tem 0 caramelos**`,
                    ephemeral: false
                })
            } else {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> **| ${user} tem 0 caramelos**`,
                    ephemeral: false
                })
            }
        }
    }
}