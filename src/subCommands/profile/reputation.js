const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const moment = require("moment")
const User = require('../../database/Schemas/User')
const Filter = require('bad-words-br')

const filtro = new Filter({ placeHolder: 'x', replaceRegex:  /[A-Za-z0-9가-힣_]/g });
const cooldowns = {}

module.exports = async (client, interaction, t) => {
    const https = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const noHttps = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    let user = interaction.options.getUser('user')
    let text = interaction.options.getString('text') ? interaction.options.getString('text') : 'Não definido... , pelo menos você tem a chance de ver esse textinho bonitinho ne!\nVocê é especial, se esse usuário enviou uma rep para você, eu não duvido nada, Seja feliz!'
    let mes = await filtro.clean(`${text}`)
      if(user.id === interaction.user.id) {
          interaction.reply({
              content: 'Você não pode dar reputação pra você mesmo!',
              ephemeral: true
          })
      } else {

        const usac = await User.findOne({
            user: user.id
        });

        const authorData = await User.findOne({
            user: interaction.user.id
        });

        if(!usac) return interaction.reply({ content: 'Este usuário não foi cadastrada em minha database, peça que ele use um de meus comandos!', ephemeral: true})
        
        let timeout = 3600000
        let repTim = authorData.profile.reps.time


        if(repTim !== null && timeout - (Date.now() - repTim) > 0) {
            let time = moment.duration(timeout - (Date.now() - repTim)).format("D [dias], H [horas], m [minutos], s [segundos]").replace('minsutos', 'minutos')
            
        
        interaction.reply({content: `*espere* \`${time}\` *para dar um rep novamente.*`, ephemeral: true })
    } else {

        if(https.test(text)) return interaction.reply({content: 'Por favor, sem links na mensagem de reputação.', ephemeral: true})
        if(noHttps.test(text)) return interaction.reply({content: 'Por favor, sem links na mensagem de reputação.', ephemeral: true})


        let embed1 = new Discord.MessageEmbed()
        .setTitle('Reputation Send')
        .setDescription(`Você realmente quer enviar uma reputação para ${user}?`)
        .setColor('LUMINOUS_VIVID_PINK')
        if(text) embed1.addFields({ name: 'Reputation Text', value: `*${mes}*`})

        let button1 = new Discord.MessageButton()
        .setCustomId('yes')
        .setLabel('Confirmar')
        .setStyle('SUCCESS')

        let row = new Discord.MessageActionRow().addComponents(button1)
        let msg = await interaction.reply({embeds: [embed1], components: [row], fetchReply: true}) 

        const filter = user => user
        const collector = msg.createMessageComponentCollector({ filter, time: 60000})
        collector.on('collect', async (i) => {
            if(i.user.id !== interaction.user.id) return;
            if(i.customId === 'yes') {
                if(repTim !== null && timeout - (Date.now() - repTim) > 0) {
                    i.reply({ content: 'Você já deu uma reputação espertinho!', ephemeral: true})
            } else {
                usac.profile.reps.count++
                usac.profile.reps.myReps.push(`📥 Recebeu uma rep de ${interaction.user.tag}`)
                authorData.profile.reps.time = Date.now()
                authorData.profile.reps.myReps.push(`📤 Enviou uma rep para ${user.tag}`)
                usac.save()
                authorData.save()
                embed1.setTitle('Reputation Success!')
                embed1.setDescription(`${interaction.user} enviou uma reputação para ${user}!`)
                embed1.setColor('GREEN')
                i.update({ embeds: [embed1], components: []})

                let embedSend = new Discord.MessageEmbed()
                .setTitle('Reputation')
                .setDescription(`Você recebeu uma reputação de: ${interaction.user}`)
                .setColor('GREEN')
                .addFields({ name: 'Reputation Text', value: `${mes}`})


                try{
                    user.send({ embeds: [embedSend]})
                } catch (err) {
                    interaction.channel.send({ embeds: [embedSend], content: `${user}`})
                }
                
            }
            }
        })
        }
      }
    }