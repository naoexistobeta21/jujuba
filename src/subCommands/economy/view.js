const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Discord = require("discord.js")
const Command = require('../../structures/Command')
const Economy = require('../../../packages/economy')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}


module.exports = async (client, interaction, t) => {
    
    const user = interaction.options.getUser('usuário') || interaction.user;

    const coins = await Economy.view(user)
        if(coins) {
            let caramelos = coins.format
            if(user.id === interaction.user.id) {
                
                interaction.reply({
                    content: `<:caramelo:974519013642227732> | Você tem **${caramelos}** caramelos!`,
                    ephemeral: false
                })
            } else {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> | ${user} tem **${caramelos}** caramelos!`,
                    ephemeral: false
                })
            }
        } else {
            let test = await Economy.newAccount(user)
            if(user.id === interaction.user.id) {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> | Você acaba de criar sua conta no **LisaCard**, veja suas informações:\n\n**NUMERO:** ${interaction.user.id}\n**VÁLIDADE:** VITALÍCIO\n**CVV:** ${test.cvv}`,
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> | ${user} tem **0** caramelos!`,
                    ephemeral: false
                })
            }
        }
    }