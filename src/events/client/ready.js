const Event = require('../../structures/Event')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const Fundo = require('../../database/Schemas/Fundo')
const Guild = require('../../database/Schemas/Guild')
const c = require('colors')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(c.green(`[ READY ] - BOT LOGADO COMO `) + c.red(`${this.client.user.tag} `) + c.green('EM ') + c.red(`${this.client.guilds.cache.size} `) + c.green('SERVIDORES'))
        this.client.registryCommands()
        this.client.user.setStatus("online")
        if(this.client.user.id === '970134090152034354') {
            this.client.user.setActivity(`Adventure time!`, { type: "PLAYING"})
        } else if(this.client.user.id === '960344090241798155') {
            this.client.user.setActivity(`Vem coisa nova por aí!`, { type: "PLAYING"})
        }
        const dbIndex = require("../../database/index");
        dbIndex.start();
        
        if(this.client.user.id === '970134090152034354') {
            const button = new MessageButton()
        .setCustomId('ligarmanu')
        .setLabel('ON')
        .setStyle('SUCCESS')
        
        const button2 = new MessageButton()
        .setCustomId('desligarmanu')
        .setLabel('OFF')
        .setStyle('DANGER')

        const row = new MessageActionRow().addComponents(button, button2)


         this.client.channels.cache.get('974576802959880192').send({
             content: `https://cdn.discordapp.com/attachments/967120262510297141/974582449214480404/static.png`,
             components: [row]
         })
        this.client.channels.cache.get('974576802959880192').bulkDelete(5)
        }

    }
}