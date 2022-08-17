
const Command = require('../../structures/Command')
const { MessageAttachment, MessageEmbed, MessageButton } = require('discord.js')
const User = require('../../database/Schemas/User')
const Fundo = require('../../database/Schemas/Fundo')
const Coins = require('discord-mongo-currency')
const fs = require('fs')
const paginationEmbed = require('../../../packages/paginator/pages');

module.exports = async (client, interaction, t) => {
    const user = await User.findOne({ user: interaction.user.id })
    let random = Math.floor(Math.random() * 2)
    const coins = await getUserCoins(interaction.user)
    if(coins < 30000) return interaction.reply({ embeds: [new MessageEmbed().setDescription('<:pb_rage:1000175213692071977> Você precisa de pelo menos 30 mil caramelos!\n<a:emoji_107:1001442897981345853> **Como eu consigo caramelos?** você pode pegar no `/economy daily` ou comprar em [clique aqui](https://discord.gg/jujuba) ou `/premium buy`').setColor('DARK_VIVID_PINK').setFooter({ text: 'Não compre caramelos de terceiros, fique atento a golpes!'})]})
    user.profile.layout.background = random;
    user.save()

    Coins.deductCoins(interaction.user, '968570313027780638', 30000)
    const attachment = new MessageAttachment(`./src/images/backgrounds/back_0${random}.jpg`, `teste${random}.jpg`)
    const embed = new MessageEmbed()
    .setTitle('Motivation Texts')
    .setDescription(MotivationTexts())
    .setColor("#ffa8eb")
    interaction.reply({ content: 'Background aleatório equipado!', files: [attachment], embeds: [embed] })
    }

    //vou colocar uma embed com textos motivacionais aqui

function MotivationTexts () {
    let array = [
        'Não se condene pelos seus erros, você está aprendendo a viver. Porém, não se acomode aos erros que comete, busque sempre evoluir diante dos seus aprendizados e do que faz sentido para você. Se conheça e se permita amadurecer com os caminhos percorridos por você.',
        'Mesmo que essa seja uma fase difícil, você sabe que também irá passar por ela. Você é uma pessoa forte e comprometida a evoluir, dessa forma aprende com a vida até mesmo em momentos ruins. Permita-se sentir a grandeza que existe dentro de você para superar obstáculos.',
        'O importante na vida não é errar simplesmente para aprender. É também se observar e se tornar um ser desperto e autoconsciente para reconhecer as situações e agir diante delas. Pratique o seu autoconhecimento e desperte o seu olhar para a vida, veja além daquilo que seus olhos alcançam.',
        'Nâo fique procurando desculpas e nem culpados Seja humilde para reconhcer uma falha. Aprenda com os erros e recomece com mais certeza. O erro é uma forma de ensino poderosa',

    ]

    return array[Math.floor(Math.random() * array.length)]
}

async function getUserCoins(user) {
    let coins = await Coins.findUser(user.id, '968570313027780638')

    return coins.coinsInWallet
}
