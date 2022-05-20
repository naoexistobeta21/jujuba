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
            name: 'daily',
            description: 'ganhe bitcoins todos os dias.',
        })
    }

    run = async (interaction) => {
        
        interaction.channel.sendTyping()

        let user = await User.findOne({ IdU: interaction.user.id })
        let timeout = 86400000
        let daily = user.daily
        let random = Math.floor(Math.random() * 20000 ) + 500;


        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
        
        interaction.reply({content: `*Você já coletou seu daily hoje. volte em:* \`${time}\`` })} else {

            interaction.reply({content: `*Recompensa diária coletada, \`${random}\` bitcoins*`})
            let ddd = await User.findOneAndUpdate({
                IdU: interaction.user.id,
                daily: Date.now()
            })
            
            db.giveCoins(interaction.user.id,`968570313027780638`, random);

        }


    }
}