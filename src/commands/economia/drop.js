//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const User = require('../../database/Schemas/transactions')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'drop',
            description: '[ 🪙 ECONOMIA ] Drop caramelos pro povo.',
            options: [
                {
                    type: 'STRING',
                    name: 'valor',
                    description: 'valor a ser dropado',
                    required: true
        }
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
    const value = interaction.options.getString('valor')
    if(isNaN(value)) return interaction.reply({ content: '*Digite um numero válido, exemplo: 1000000*', ephemeral: true})

    const coins = await bitcoin.findUser(interaction.user.id, '968570313027780638')

    if(value > 100000000) return interaction.reply({ content: '*Você só pode dropar até 100 milhões de caramelos!*', ephemeral: true})
        
     if(value < 1000) {
         interaction.reply({ content: '*é necessário pelo menos 1000 caramelos para iniciar um drop*', ephemeral: true})
     } else if(coins.coinsInWallet < value) {
         interaction.reply({ content: '*Você não tem caramelos suficientes!*', ephemeral: true})
     } else {
        const button = new MessageButton()
        .setCustomId(`pegarDropzin${interaction.user.id}`)
        .setEmoji('📦')
        .setStyle('SECONDARY')

        const button2 = new MessageButton()
        .setCustomId(`cancelarDropzin${interaction.user.id}`)
        .setEmoji('<:no:968500770934755388>')
        .setStyle('DANGER')

        const row = new MessageActionRow().addComponents(button, button2)

		let embed = new MessageEmbed()
        .setTitle(`Drop de ${interaction.user.tag}`)
        .setColor('#D109E3')
        .setDescription(`**__Prêmio:__** \`${Utils.toAbbrev(value)}\`\n\n*Seja o primeiro a pegar apertando no botão* 📦`)

        interaction.reply({
             embeds: [embed],
             components: [row]
         })
         
         const filter = i => i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
    if(i.customId === `pegarDropzin${interaction.user.id}`) {
        if(i.user.id !== interaction.user.id) {
            bitcoin.giveCoins(i.user.id, '968570313027780638', value)
            bitcoin.deductCoins(interaction.user.id, '968570313027780638', value)

            const TransNew = new User({
                user: i.user.id,
                transaction: `<:add:977391516412698705> Ganhou de um drop especial ${Utils.toAbbrev(value)} (${value})`
            })
            TransNew.save()

            embed.setDescription(`**__Prêmio:__** \`${Utils.toAbbrev(value)}\`\n\n*${i.user}  foi mais rápido e ganhou **${Utils.toAbbrev(value)}** caramelos patrocinado por ${interaction.user}*`)
            await i.update({
                embeds: [embed],
                components: []
            })
        } else {
            i.reply({ content: '*Você não pode pegar o seu próprio drop.*', ephemeral: true})
        }
    } else if(i.customId === `cancelarDropzin${interaction.user.id}`) {
        if(i.user.id === interaction.user.id) {
            embed.setDescription(`**__Prêmio:__** \`${Utils.toAbbrev(value)}\`\n\n*Drop cancelado pelo ${interaction.user}*`)
        await i.update({
            embeds: [embed],
            components: []
        }) 
        } else {
            i.reply({ content: '*Você não pode cancelar um drop que você não fez!*', ephemeral: true})
        }
    }
});

collector.on('end', (collected, reason) => {
    if(reason === 'time') {
        embed.setDescription(`**__Prêmio: __** \`${value}\`\n\n*o drop foi cancelado por inatividade.*`)
        interaction.editReply({
            embeds: [embed],
            components: []
        })
    }
});
     }
    }
}