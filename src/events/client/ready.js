const Event = require('../../structures/Event')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const Fundo = require('../../database/Schemas/Fundo')
const Guild = require('../../database/Schemas/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
        this.client.registryCommands()
        this.client.user.setStatus("online")
        this.client.user.setActivity(`Adventure time!`, { type: "PLAYING"})
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