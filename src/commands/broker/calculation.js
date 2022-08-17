const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const math = require('../../../packages/calc')
const cooldowns = {}
let content = ` `

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'calculation',
            description: '[ ➕ CALCULATION ] Calcule numeros.',
        })
    }

    run = async (interaction) => {

        //buttons numbers
        let btn1 = new Discord.MessageButton().setLabel('1').setStyle('PRIMARY').setCustomId('1')
        let btn2 = new Discord.MessageButton().setLabel('2').setStyle('PRIMARY').setCustomId('2')
        let btn3 = new Discord.MessageButton().setLabel('3').setStyle('PRIMARY').setCustomId('3')
        let btn4 = new Discord.MessageButton().setLabel('4').setStyle('PRIMARY').setCustomId('4')
        let btn5 = new Discord.MessageButton().setLabel('5').setStyle('PRIMARY').setCustomId('5')
        let btn6 = new Discord.MessageButton().setLabel('6').setStyle('PRIMARY').setCustomId('6')
        let btn7 = new Discord.MessageButton().setLabel('7').setStyle('PRIMARY').setCustomId('7')
        let btn8 = new Discord.MessageButton().setLabel('8').setStyle('PRIMARY').setCustomId('8')
        let btn9 = new Discord.MessageButton().setLabel('9').setStyle('PRIMARY').setCustomId('9')
        let btn0 = new Discord.MessageButton().setLabel(' ').setStyle('SECONDARY').setCustomId('ffawse').setDisabled(true)
        let btn01 = new Discord.MessageButton().setLabel('9').setStyle('PRIMARY').setCustomId('0')
        let btn02 = new Discord.MessageButton().setLabel(' ').setStyle('SECONDARY').setCustomId('ffff').setDisabled(true)

        //buttons rows
        const row1 = new Discord.MessageActionRow().addComponents(btn1, btn2, btn3, btn4, btn5)
        const row2 = new Discord.MessageActionRow().addComponents(btn6, btn7,btn8, btn9, btn01)

        //buttons features
        let btn10 = new Discord.MessageButton().setLabel('+').setStyle('SUCCESS').setCustomId('+')
        let btn11 = new Discord.MessageButton().setLabel('-').setStyle('DANGER').setCustomId('-')
        let btn12 = new Discord.MessageButton().setLabel('/').setStyle('SECONDARY').setCustomId('/')
        let btn13 = new Discord.MessageButton().setLabel('=').setStyle('SUCCESS').setCustomId('=')
        let btn14 = new Discord.MessageButton().setLabel('+/-').setStyle('SUCCESS').setCustomId('+/-')
        let btn15 = new Discord.MessageButton().setLabel(',').setStyle('SUCCESS').setCustomId(',')
        //buttons features rows
        const row4 = new Discord.MessageActionRow().addComponents(btn10, btn11, btn12, btn13, btn14, )

        //embed principal features

        const embed = new Discord.MessageEmbed().setDescription('```js\n            \n```')

        //results features

        const btn001 = new Discord.MessageButton().setLabel('x').setCustomId('*').setStyle('SUCCESS')
        const btn002 = new Discord.MessageButton().setLabel('x').setCustomId('e').setStyle('SECONDARY').setDisabled(true)
        const btn003 = new Discord.MessageButton().setLabel('x').setCustomId('a').setStyle('SECONDARY').setDisabled(true)
        const btn004 = new Discord.MessageButton().setLabel('x').setCustomId('r').setStyle('SECONDARY').setDisabled(true)
      
        const row5 = new Discord.MessageActionRow().addComponents(btn15, btn001, btn002, btn003, btn004)


        let msg = await interaction.reply({ components: [row1, row2, row4, row5], embeds: [embed], fetchReply: true})

        let collector = msg.createMessageComponentCollector({ filter: user => user, time: 60000})

        collector.on('collect', async (i) => {
            if(i.user !== interaction.user) return i.reply({ content: `Sai daqui, isso não é para você!`, ephemeral: true})
            collector.resetTimer()
            if(i.customId === '=') {
                embed.setDescription(`\`\`\`js\n          ${mathEval(content, true)}\n\`\`\``)
                await i.update({embeds: [embed], components: [row1, row2, row4, row5]})
            } else if(i.customId === '+/-') {
                embed.setDescription(`\`\`\`js\n          ${content} = ${math.media(content)}\n\`\`\``)
                await i.update({embeds: [embed], components: [row1, row2, row4, row5]})
            } else if(i.customId === ',') {
                embed.setDescription(`\`\`\`js\n          ${math.format(Number(content))}\n\`\`\``)
                await i.update({embeds: [embed], components: [row1, row2,row4, row5]}) 
            } else {
                
            content += `${i.customId}`

            embed.setDescription(`\`\`\`js\n            ${content}\n\`\`\``)

            i.update({embeds: [embed], components: [row1, row2, row4, row5]})
            }
        })
    }
}

function mathEval(input, result = false, symbol = false) {
    try{
        if (result === false) {
            content = `${Function(
                `"use strict";let π=Math.PI;return (${input})`
            )()}` 
            return `${Function(
                `"use strict";let π=Math.PI;return (${input})`
            )()}`;
        } else
            return content = `${Function(
                `"use strict";let π=Math.PI;return (${input})`
            )()}` ,`${input
                .replaceAll('**', '^')
                .replaceAll('/100', '%')} = ${Function(
                `"use strict";let π=Math.PI;return (${input})`
            )()}`;
    } catch(err) {
        return 'Inválido', content = ` `
    }
}