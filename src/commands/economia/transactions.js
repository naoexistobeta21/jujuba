const Discord = require("discord.js")
const Command = require('../../structures/Command')
const Trans = require('../../database/Schemas/transactions')
const Utils = require("../../util/Util")
const moment = require('moment')
const ms = require("pretty-ms")
const Funcao = require('../../../packages/MongoDB/transactions')
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'transactions',
            description: '[ 🪙 ECONOMIA ] Veja suas transacoes',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que você vai ver',
                    required: false
        },
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()

        const user = interaction.options.getUser('usuário') || interaction.user;

           const teste = await Funcao.generate(user.id, 15)

           let test = teste.map(i => `${i.transaction}`)

           console.log(test)

           let content = " "

           for(let i = 0;i < teste.length;i++) {
               if(teste[i]) {
                content += `<:caramelo:974519013642227732> **|** *${teste[i].transaction}*\n`
               }
           }

           const button = new Discord.MessageButton()
        .setCustomId(`usuarioquemandou${user.id}`)
        .setLabel(`Transações de ${user.tag}`)
        .setStyle('SECONDARY')
        .setDisabled(true)

        const row = new Discord.MessageActionRow().addComponents(button)
        
    
            let embed = new Discord.MessageEmbed()
            .setDescription(`${content}`)
            .setTitle(`Histórico de transações [${teste.length}/15]`)
            .setColor('#FC0388')
            
            await interaction.reply({ embeds: [embed], components: [row]})
            }
            
        }
