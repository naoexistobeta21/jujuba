const Discord = require("discord.js")
const Command = require('../../structures/Command')
const Trans = require('../../database/Schemas/transactions')
const Utils = require("../../util/Util")
const moment = require('moment')
const ms = require("pretty-ms")
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'transactions',
            description: '[ 🪙 ECONOMIA ] Veja suas transacoes',
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        
        let user = await Trans.findOne({
        user: interaction.user.id
        })
        if(!user) {
        let date = new Date()
        let array = [
        `💸 \`${interaction.user.tag}\` criou o perfil em \`${date}\``
        ]
       
         const novo = new Trans({
         user: interaction.user.id,
         transactions: array
         })
         novo.save()
            interaction.reply({ content: '*Parece que você nunca usou o sistema de transações, acabei de criar um perfil para você, use o comando de novo!*', ephemeral: true})
        } else {
                let transUser = []
            let content = " "
            for(let i = 0;i < 10;i++) {
                if(user.transactions[i]) {
                    content += `${user.transactions[i]}\n`
                }
            }
            
            let embed = new Discord.MessageEmbed()
            .setDescription(`${content}`)
            .setTitle('Suas Transações')
            .setColor('GREEN')
            
            await interaction.reply({ embeds: [embed]})
            }
            }
        }
