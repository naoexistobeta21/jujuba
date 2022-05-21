const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'cooldowns',
            description: 'veja o que você pode fazer hoje.',
        })
    }

    run = async (interaction) => {
        
        interaction.channel.sendTyping()

        let user = await User.findOne({ IdU: interaction.user.id })
        let timeout = 86400000
        let daily = user.daily
        //let minerar = user.work
        let vip = user.vip
        let rep = user.repTime
        let vip1 = ms(timeout - (Date.now() - vip));
        //let minerar1 = ms(timeout - (Date.now() - minerar));
        let daily1 = ms(timeout - (Date.now() - daily));
        let rep1 = ms(timeout - (Date.now() - rep));


        if(daily !== null && timeout - (Date.now() - daily) <= 0) {
         daily1 = 'Pronto ✅'
        }
        /*if(minerar !== null && timeout - (Date.now() - minerar) <= 0) {
         minerar1 = 'Pronto ✅'
        }*/
        if(vip !== null && timeout - (Date.now() - vip) <= 0) {
         vip1 = 'Pronto ✅'
			}
        if(rep !== null && timeout - (Date.now() - rep) <= 0) {
         rep1 = 'Pronto ✅'
			}
            
            let embed = new Discord.MessageEmbed()
            .setDescription(`**__/daily:__** | \`${daily1}\`\n**__/rep__** | \`${rep1}\`\n**__/vip__** | \`em breve\``)
            .setColor('GREEN')

            interaction.reply({ embeds: [embed]})

  


    }
}