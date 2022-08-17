//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const User = require('../../database/Schemas/transactions')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = run = async (client, interaction, t) => {
        //interaction.channel.sendTyping()
    let value = interaction.options.getNumber('valor')

    let coins = await bitcoin.findUser(interaction.user.id, '968570313027780638')
    
    if(coins.coinsInWallet < value) {
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
         
         const filter = user => user
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
    if(i.customId === `pegarDropzin${interaction.user.id}`) {
        if(i.user.id === interaction.user.id) return i.reply({ content: 'Você não pode pegar seu próprio drop', ephemeral: true})
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
        collector.stop()
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
    collector.stop()
});
     }
    }
