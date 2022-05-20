//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'battle',
            description: '[ 🪙 ECONOMIA ] ringue de batalha.',
            options: [
                {
                    type: 'STRING',
                    name: 'valor',
                    description: 'valor a ser apostado no ringue.',
                    required: true
        }
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
    const value = interaction.options.getString('valor')
    if(isNaN(value)) return interaction.reply({ content: '*Digite um numero válido, exemplo: 1000000*'})

    const coins = await bitcoin.findUser(interaction.user.id, '968570313027780638')
        
     if(value < 1000) {
         interaction.reply({ content: '*é necessário pelo menos 1000 caramelos para iniciar um battle*', ephemeral: true})
     } else if(coins.coinsInWallet < value) {
         interaction.reply({ content: '*Você não tem caramelos suficientes!*', ephemeral: true})
     } else {
        const button = new MessageButton()
        .setCustomId('yes')
        .setEmoji('✅')
        .setStyle('SUCCESS')
        
        const button2 = new MessageButton()
        .setCustomId('entrar')
        .setLabel('PARTICIPAR')
        .setStyle('PRIMARY')

        const row = new MessageActionRow().addComponents(button, button2)

		let embed = new MessageEmbed()
        .setTitle('Battle (beta)')
        .setColor('#D109E3')
        .setDescription(`**${interaction.user.username}** iniciou um ringue de batalha\n**__Preço para participar:__** \`${value}\`\n**__Prêmio atual:__** \`${value}\`\npara participar clique no botão [PARTICIPAR], o jogador será revelado quando ${interaction.user.username} clicar no botão [✅] ou após 60 segundos ou quando bater 10 participantes na batalha.\n**__Participantes:__**\n${interaction.user} `)
         interaction.reply({
             embeds: [embed],
             components: [row]
         })
         
         const filter = i => i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
    let array = []
    let arrayss = []
    if(i.customId === 'entrar') {
        let coinsU = await bitcoin.findUser(i.user.id, '968570313027780638')
        if(coinsU.coinsInWallet < value) {
            i.reply({ content: '*Você não tem caramelos suficientes*'})
        } else if(i.user.id === interaction.user.id) {
            i.reply({ content: '*você é o dono desse battle e já está participando dele.*'})
        } else {
            if(arrayss.includes(i.user.id)) {
                i.reply({ content: '*Você já está participando desse battle*'})
            } else {
            array.push(`<@${i.user.id}>\n`)
            console.log(arrayss.length)
            embed.setDescription(`**${interaction.user.username}** iniciou um ringue de batalha\n**__Preço para participar:__** \`${value}\`\n**__Prêmio atual:__** \`${value}\`\npara participar clique no botão [PARTICIPAR], o jogador será revelado quando ${interaction.user.username} clicar no botão [✅] ou após 60 segundos ou quando bater 10 participantes na batalha.\n**__Participantes:__**\n${interaction.user}\n${array}`)
            interaction.editReply({
             embeds: [embed],
             components: [row]
         })
            i.reply({ content: '*Pronto, agora é só esperar o tempo.*', ephemeral: true})
                arrayss.push(i.user.id)
            }
        }
    } else if(i.customId === 'yes') {
        if(i.user.id === interaction.user.id) {
            if(arrayss.length < 2) {
                i.reply({ content: '*o battle que você criou não teve jogadores suficientes e foi cancelado.*', ephemeral: true})
                interaction.editReply({
            components: []
        })
            } else {
            let ganhador = arrayss[Math.floor(Math.random()*arrayss.length)]
            i.reply({ content: `✨ <@${ganhador}> *ganhou no battle de* ${interaction.user}`})
            }
        }
    }
});

collector.on('end', (collected, reason) => {
    if(reason === 'time') {
        interaction.editReply({
            components: []
        })
    }
});
     }
    }
}