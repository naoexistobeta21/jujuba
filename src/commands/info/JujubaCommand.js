const Command = require('../../structures/Command')
const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const ms = require("ms");
const fs = require("fs");
let os = require("os");
let cpuStat = require("cpu-stat");
let pex = ("`") 
let jat = ("**")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'jujuba',
            description: '[ ❓ INFO ] - Veja tudo sobre mim.'
        })
    }

    run = async (interaction) => {
        //interaction.channel.sendTyping()
        let gg = 0
        let gg2 = 0
        let gg3 = 0
        let test = await this.client.cluster.broadcastEval(`this.guilds.cache.size`)
        let test2 = await this.client.cluster.broadcastEval(`this.users.cache.size`)
        let test3 = await this.client.cluster.broadcastEval(`this.channels.cache.size`)
        for(let i = 0; i < test.length; i++) {
            gg = gg + test[i]
        }
        for(let i = 0; i < test2.length; i++) {
            gg2 = gg2 + test2[i]
        }
        for(let i = 0; i < test3.length; i++) {
            gg3 = gg3 + test3[i]
        }

        let totalGuilds = gg ? gg : 0
        const cliente = this.client.readyAt
        const users = gg2 ? gg2 : 0
        const channels = gg3 ? gg3 : 0
        const ping = this.client.ws.ping
        const svc = os.platform()
        const cpuS = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 16GB`
          cpuStat.usagePercent(function (err, percent, seconds) {
              const duration = moment.duration(cliente).format("D [dias], H [horas], m [minutos], s [segundos]").replace('minsutos', 'minutos')
              const button = new Discord.MessageButton()
              .setLabel('Comunidade')
              .setStyle('LINK')
              .setURL('https://discord.gg/FvXJ3vbKaD')
              
              const button2 = new Discord.MessageButton()
              .setLabel('Convidar')
              .setStyle('LINK')
              .setURL('https://discord.com/api/oauth2/authorize?client_id=970134090152034354&permissions=671399942&scope=bot%20applications.commands')
              
              
              const button4 = new Discord.MessageButton()
              .setLabel('GitHub - nãoexisto')
              .setStyle('LINK')
              .setURL('https://github.com/naoexistobb')
              
              const button5 = new Discord.MessageButton()
              .setLabel('Website')
              .setStyle('LINK')
              .setURL('https://jujuba.website/')
              .setDisabled(true)
        const row = new Discord.MessageActionRow().addComponents(button, button2, button4)
              const embed = new Discord.MessageEmbed()
              .setTitle('Olá, eu me chamo Jujuba!')
              .setDescription(`Olá, eu me chamo jujuba (meus amigos próximos me chamam de "Ju"), tenho 17 anos e, estou em busca de deixar seu servidor unico e extraordinário!\n\nAtualmente estou espalhando alegria em **${totalGuilds} servidores**, cuidando de **${users} usuários**, supervisionando **${channels} canais**.\n\nOnline desde **<t:${Math.floor(cliente / 1000)}>**, usando aproximadamente **${cpuS} memória ram**, hospedada na **Gratian host**, com servidor dedicado **${svc}**, meu ping é **${Math.round(ping)}ms**, estou usando **${Math.round(percent)}%** da cpu`)
              .setColor('#F549EF')
              .setImage('https://cdn.discordapp.com/attachments/1002333100744912977/1002333890192625785/a-1.gif')
              
              interaction.reply({embeds: [embed], components: [row]})
          })
    }
}