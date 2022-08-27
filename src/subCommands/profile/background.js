
const Command = require('../../structures/Command')
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')
const User = require('../../database/Schemas/User')
const Economy = require('../../../packages/economy')
const p = require('../../../packages/shop')

module.exports = async (client, interaction, t) => {
    const user = await User.findOne({ user: interaction.user.id })
    const coins = await Economy.view(interaction.user)
    let page = 0

    let embeds = await p.pages()

    const ButtonBuy = new MessageButton()
    .setLabel('COMPRAR')
    .setCustomId('buy')
    .setStyle('SUCCESS')
    .setEmoji('🛒')

    const ButtonEquip = new MessageButton()
    .setCustomId('equip')
    .setStyle('SECONDARY')
    .setEmoji('📥')
    .setLabel('EQUIPAR')

    const ButtonVoltar = new MessageButton()
    .setCustomId('back')
    .setEmoji('⬅️')
    .setStyle('PRIMARY')
    .setDisabled(true)

    const ButtonProximo = new MessageButton()
    .setCustomId('next')
    .setEmoji('➡️')
    .setStyle('PRIMARY')

    if(!embeds[1]) ButtonProximo.setDisabled(true)

    if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
        ButtonBuy.setDisabled(false)
        ButtonEquip.setDisabled(true)
    } else {
        ButtonBuy.setDisabled(true)
        if(user.profile.layout.background !== embeds[page].image) {
            ButtonEquip.setDisabled(false)
        } else {
            ButtonEquip.setDisabled(true)
        }
    }

    const row = new MessageActionRow().addComponents(ButtonVoltar, ButtonBuy, ButtonEquip, ButtonProximo)

    let msg = await interaction.reply({ embeds: [embeds[0].embed], components: [row], fetchReply: true })

    const filter = user => user

    const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

    collector.on('collect', async (i) => {
        if(i.user !== interaction.user) return i.reply({ content: 'Você não pode usar isso aqui.', ephemeral: true})

        collector.resetTimer()

        if(i.customId === 'next') {
            page = page + 1

            if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
                ButtonBuy.setDisabled(false)
                ButtonEquip.setDisabled(true)
            } else {
                ButtonBuy.setDisabled(true)
                if(user.profile.layout.background !== embeds[page].image) {
                    ButtonEquip.setDisabled(false)
                } else {
                    ButtonEquip.setDisabled(true)
                }
            }

            if(!embeds[page + 1]) {
                ButtonProximo.setDisabled(true)
            } else {
                ButtonProximo.setDisabled(false)
            }

            if(!embeds[page - 1]) {
                ButtonVoltar.setDisabled(true)
            } else {
                ButtonVoltar.setDisabled(false)
            }

            i.update({ embeds: [embeds[page].embed], components: [row]})
        } else if(i.customId === 'back') {
            page = page - 1

            if(!embeds[page - 1]) {
                ButtonVoltar.setDisabled(true)
            } else {
                ButtonVoltar.setDisabled(false)
            }

            if(!embeds[page + 1]) {
                ButtonProximo.setDisabled(true)
            } else {
                ButtonProximo.setDisabled(false)
            }

            if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
                ButtonBuy.setDisabled(false)
                ButtonEquip.setDisabled(true)
            } else {
                ButtonBuy.setDisabled(true)
                if(user.profile.layout.background !== embeds[page].image) {
                    ButtonEquip.setDisabled(false)
                } else {
                    ButtonEquip.setDisabled(true)
                }
            }

            i.update({ embeds: [embeds[page].embed], components: [row]}) 
        } else if(i.customId === 'buy') {
            if(coins.normal < embeds[page].value) return i.reply({ content: 'Caramelos insuficientes, quer mais caramelos? use `/premium buy`', ephemeral: true})

            await Economy.remove(interaction.user, embeds[page].value)
            user.profile.backgrounds.push(embeds[page].image)
            user.save()

            interaction.channel.send({ content: `🛒 | ${interaction.user}, background **${embeds[page].name}** comprado com sucesso!`})
        } else if(i.customId === 'equip') {
            if(!user.profile.backgrounds.includes(embeds[page].image)) return i.reply({ content: 'Você não tem esse background!', ephemeral: true})
            user.profile.layout.background = embeds[page].image;
            user.save()

            interaction.channel.send({ content: `📥 | ${interaction.user}, background **${embeds[page].name}** equipado com sucesso, use \`/profile view\` para ver ele!`})
        }
    })
}
