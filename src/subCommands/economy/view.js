const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}


module.exports = async (client, interaction, t) => {
    
    const user = interaction.options.getUser('usuário') || interaction.user;

    const coins = await db.findUser(user.id, '968570313027780638')
        if(coins) {
            if(user.id === interaction.user.id) {
                let coinsV = coins.coinsInWallet
                interaction.reply({
                    content: `${t('commands:caramelos.usertem', {
                        coinsV,
                        coinsAbb: Utils.toAbbrev(coins.coinsInWallet)
                    })}`,
                    ephemeral: false
                })
            } else {
                interaction.reply({
                    content: `<:caramelo:974519013642227732> **| ${user} tem ${Utils.toAbbrev(coins.coinsInWallet)} (\`${coins.coinsInWallet}\`) caramelos**`,
                    ephemeral: false
                })
            }
        } else {
            db.createUser(user.id, '968570313027780638')
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