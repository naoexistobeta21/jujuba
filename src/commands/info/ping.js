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

    run = (interaction) => {
        interaction.channel.sendTyping()
        
        const cliente = this.client.uptime
        const servers = this.client.guilds.cache.size
        const users = this.client.users.cache.size
        const channels = this.client.channels.cache.size
        const ping = this.client.ws.ping
        const svc = os.platform()
        const cpuS = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 4096MB`
          cpuStat.usagePercent(function (err, percent, seconds) {
              const duration = moment.duration(cliente).format("D [dias], H [horas], m [minutos], s [segundos]");
              const button = new Discord.MessageButton()
              .setLabel('Comunidade')
              .setStyle('LINK')
              .setURL('https://discord.gg/fTGB8uVZJV')
              
              const button2 = new Discord.MessageButton()
              .setLabel('Convidar')
              .setStyle('LINK')
              .setURL('https://discord.com/api/oauth2/authorize?client_id=970134090152034354&permissions=671399942&scope=bot%20applications.commands')
              
              const button3 = new Discord.MessageButton()
              .setLabel('Gratian Host')
              .setStyle('LINK')
              .setURL('https://discord.gg/vnaANRr3bq') //
              
              const button4 = new Discord.MessageButton()
              .setLabel('GitHub - nãoexisto')
              .setStyle('LINK')
              .setURL('https://github.com/naoexistobb')
              
              const button5 = new Discord.MessageButton()
              .setLabel('Website')
              .setStyle('LINK')
              .setURL('https://jujubawebsite.herokuapp.com/')
        const row = new Discord.MessageActionRow().addComponents(button, button2, button3, button4, button5)
              const embed = new Discord.MessageEmbed()
              .setTitle('Olá, eu me chamo Jujuba!')
              .setDescription(`Olá, eu me chamo jujuba (meus amigos próximos me chamam de "Ju"), tenho 17 anos e, estou em busca de deixar seu servidor unico e extraordinário!\n\nAtualmente estou espalhando alegria em **${servers} servidores**, cuidando de **${users} usuários**, supervisionando **${channels} canais**.\n\nEstou online a **${duration}**, usando aproximadamente **${cpuS} memória ram**, hospedada na **Gratian host**, com servidor dedicado **${svc}**, meu ping é **${Math.round(ping)}ms**`)
              .setColor('#F549EF')
              .setImage('https://cdn.discordapp.com/attachments/967120262510297141/975466171065303140/acha-que-sabe-tudo-sobre-princesa-jujuba-de-hora-de-aventura_f.webp')
              
              interaction.reply({embeds: [embed], components: [row]})
          })
    }
}