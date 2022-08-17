const { MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')
const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const User = require('../../database/Schemas/User')
module.exports = async (client, interaction, t) => {
        let verificar = false
        let max = interaction.options.getNumber('maximo')
        let value = interaction.options.getNumber('valor')
        let authorCoins = await bitcoin.findUser(interaction.user.id, '968570313027780638')
        let authorUser = await User.findOne({ user: interaction.user.id})
        if(authorCoins.coinsInWallet < value) return interaction.reply({ content: 'Você não tem caramelos suficientes!', ephemeral: true})
        if(!max) max = 30
let participantes = []
let participantesy = []
participantes.push(interaction.user.id)
participantesy.push(interaction.user)
let premio = value
let button1 = new MessageButton()
.setEmoji('🟣')
.setCustomId(`join${interaction.user.id}`)
.setStyle('SECONDARY')

let button2 = new MessageButton()
.setEmoji('✅')
.setCustomId(`ready${interaction.user.id}`)
.setStyle('SUCCESS')

let row = new MessageActionRow().addComponents(button2, button1)

let text = `${participantesy.join('\n')}`
let embed = new MessageEmbed()
.setTitle('Battle')
.setColor('#fa0584')
.setDescription(`${interaction.user.username} Iniciou uma Batalha!\nPreço para participar: ${Utils.toAbbrev(value)} (\`${value}\`)\nPrêmio atual: ${Utils.toAbbrev(premio)} (\`${premio}\`)\nPara participar clique em "🟣", o ganhador será revelado quando ${interaction.user.username} clicar em "✅" ou após 60s ou quando ${max} participantes entrarem na batalha.
**Participantes (${participantes.length}/${max})**\n${text}`)

interaction.reply({ embeds: [embed], components: [row]})


const filter = user => user
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: max });
let content = " "
collector.on('collect', async (i) => {
let user = i.user
if(i.customId === `join${interaction.user.id}`) {
let isCoins = await bitcoin.findUser(user.id, '968570313027780638')
if(isCoins.coinsInWallet < value) return i.reply({ content: 'Você não tem caramelos suficientes!', ephemeral: true})
bitcoin.deductCoins(user.id, '968570313027780638', value)
if(participantes.includes(user.id)) return i.reply({ content: 'Você não pode entrar de novo na batalha!', ephemeral: true})
participantes.push(user.id)
participantesy.push(user)
text = `${participantesy.join('\n')}`
premio = premio + value
if(participantes.length >= max) verificar = true
i.reply({ content: `Você entrou na batalha de ${interaction.user.tag}, aguarde ela começar!`})

} else if(i.customId === `ready${interaction.user.id}`) {
    verificar = true
    i.update({ components: []})
    i.reply({ content: 'Você usou o botão para fazer sua batalha ir mais rápido!', ephemeral: true})
    collector.stop()
}
})
    


collector.on('end', (collected, reason) => {
if(verificar === true) {
    if(participantes.length > 1) {
        let ganhador = participantes[Math.floor(Math.random() * participantes.length)]
        console.log(ganhador)
        for(let i = 0; i < participantes.length; i++) {
         if(participantes[i] !== ganhador) {
            bitcoin.deductCoins(participantes[i], '968570313027780638', value)
         }
         
        }

        bitcoin.giveCoins(ganhador, '968570313027780638', premio)
         interaction.channel.send({ content: `\🎉 | <@${ganhador}> ganhou ${Utils.toAbbrev(premio)} (${premio}) caramelhos patrocinado por ${interaction.user} e ${participantes.length - 1} perderam ${Utils.toAbbrev(value)} (${value}) caramelos!`})
        
    } else {
        interaction.channel.send(`<:QdW_meltedo:978739365972955186> | ${interaction.user}, Sua batalha foi cancelada por falta de participantes!`)
    }
}

});

    }
    
