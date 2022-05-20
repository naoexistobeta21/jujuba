const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const ms = require("ms")
const User = require('../../database/Schemas/User')
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'rep',
            description: 'de reputação para usuários.',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que vai receber a reputação',
                    required: true
        },
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
       let user = interaction.options.getUser('usuário')
      if(user.id === interaction.user.id) {
          interaction.reply({
              content: 'Você não pode dar reputação pra você mesmo!',
              ephemeral: true
          })
      } else {

        const usac = await User.findOne({
            IdU: user.id
        });

        if(!usac) {
            interaction.reply({
              content: 'esse usuário não está na minha database!',
                ephemeral: true
          })
        } else {
            
        let data = await User.findOne({ IdU: interaction.user.id })
        let timeout = 86400000
        let repTim = user.repTime


        if(repTim !== null && timeout - (Date.now() - repTim) > 0) {
            let time = ms(timeout - (Date.now() - repTim));
        
        interaction.reply({content: `*espere* \`${time}\` para dar um rep novamente.*` })} else {
            await User.findOneAndUpdate({
        IdU: user.id,
        reps: usac.reps + 1
        }) 
            interaction.reply({content: `*${interaction.user} enviou uma rep para ${user}*`})
            await User.findOneAndUpdate({
                IdU: interaction.user.id,
                repTime: Date.now()
            })
          

        }
        }

      }

    }
}