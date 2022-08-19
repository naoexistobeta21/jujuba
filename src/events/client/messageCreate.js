const Discord = require("discord.js");
const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
module.exports = class extends Event {

   constructor(client) {

        super(client, {

            name: 'messageCreate'

        })

    }

    run = async (message) => {

    if(message.channel.type !== 'GUILD_TEXT') return;
    if(message.content === `${this.client.user}`) return getResponse(message, this.client)

    /*
    const db = await Guild.findOne({ server: message.guild.id })
    if(db?.botconfig.antilink.status) {
    const https = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const noHttps = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    const https2 = /^https?:\/\/?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const http = /^http?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const http2 = /^http?:\/\/?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const teste1 = https.test(message.content)
    const teste2 = noHttps.test(message.content)
    const teste3 = https2.test(message.content)
    const teste4 = http.test(message.content)
    const teste5 = http2.test(message.content)

    if(true === false) {
        if(teste1 || teste2 || teste3 || teste4 || teste5) {
            try{
                message.delete()
            } catch (err) {
                return;
            }
        } else if(message.content.includes('http://') || message.content.includes('https://')) {
            try{
                message.delete()
            } catch (err) {
                return;
            }
        }
    }

    
    }
    */
  }

} 

async function getResponse(message, client) {
    

        let button = new Discord.MessageButton()
        .setLabel('Invite Me!')
        .setStyle('LINK')
        .setURL(`https://top.gg/bot/${client.user.id}`)

        let button2 = new Discord.MessageButton()
        .setLabel('Como Configurar?')
        .setStyle('PRIMARY')
        .setCustomId('config')
if(teste1 || teste2 || teste3 || teste4 || teste5) {
        try{
            message.delete()
        } catch (err) {
            return;
        }
    } else if(message.content.includes('http://') || message.content.includes('https://')) {
        try{
            message.delete()
        } catch (err) {
            return;
        }
    }
        let row = new Discord.MessageActionRow().addComponents(button, button2)
        let embed = new Discord.MessageEmbed()
        .setDescription(`<:pb_attaboi:1000167758564167702> Estou disponivél em [Slash Commands](https://support.discord.com/hc/pt-br/articles/1500000368501-Slash-Commands-FAQ), use \`/help\`!`)
        .setColor('DARK_VIVID_PINK')
        return message.reply({ embeds: [embed], components: [row]}).then((msg) => {

            const filter = user => user
            const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

            collector.on('collect', (i) => {
                if(i.user !== message.author) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})

                let emb = new Discord.MessageEmbed()
                .setTitle('Docs')
                .setDescription(`Ainda não tenho um jeito de configurar, você pode usar \`/moderator dashboard\``)
                .setColor('RED')
                i.reply({ embeds: [emb], ephemeral: true })
            })
            setTimeout(() => {
                msg.delete()
            }, 60000)
        })
    
}

