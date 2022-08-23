const Discord = require("discord.js");
const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
const shell = require('shelljs');
const bot = require('../../../index')
module.exports = class extends Event {

   constructor(client) {

        super(client, {

            name: 'messageCreate'

        })

    }

    run = async (message) => {

    if(message.channel.type !== 'GUILD_TEXT') return;

    let funcs = {
        restart: {
            command: 'pm2 restart all',
            start: shell.exec
        },
        kill:  {
            command: 'pm2 kill',
            start: shell.exec
        }
    }

    if(message.author.id === '947856944515936306' && funcs[message.content] && this.client.user.id === '960344090241798155') {
        funcs[message.content].start(funcs[message.content].command)
    }

    let arr = [
        `<@${this.client.user.id}>`,
        `<@!${this.client.user.id}>`
    ]

    if(arr.includes(message.content)) return getResponse(message, this.client)
  }

} 

async function getResponse(message, client) {
    

        let button = new Discord.MessageButton()
        .setLabel('Invite Me!')
        .setStyle('LINK')
        .setURL(`https://top.gg/bot/${client.user.id}`)

        let button2 = new Discord.MessageButton()
        .setLabel('Como Usar?')
        .setStyle('PRIMARY')
        .setCustomId('config')

        let cc = `**Comandos:**\n`

        bot.client.commands.forEach(async (cmd) => {
            cc += ` \`${cmd.name}\` `
        })

        let row = new Discord.MessageActionRow().addComponents(button, button2)
        let embed = new Discord.MessageEmbed()
        .setDescription(`<:pb_attaboi:1000167758564167702> Estou disponivél em [Slash Commands](https://support.discord.com/hc/pt-br/articles/1500000368501-Slash-Commands-FAQ), use \`/help\`!\n\n${cc}`)
        .setColor('DARK_VIVID_PINK')
        .setFooter({ text: 'cada comando tem seus sub comandos, exemplo: /user avatar'})
        return message.reply({ embeds: [embed], components: [row]}).then((msg) => {

            const filter = user => user
            const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

            collector.on('collect', (i) => {
                if(i.user !== message.author) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})
                i.reply({ files: ['https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/628572088b1d3cf52023fc2a_11111_command-picker.png'], ephemeral: true })
            })
            setTimeout(() => {
                msg.delete()
            }, 60000)
        })
    
}

