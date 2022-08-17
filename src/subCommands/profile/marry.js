const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const Levels = require("discord-xp");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const User = require('../../database/Schemas/User')


module.exports = async (client, interaction, t) => {
    const user = interaction.options.getUser('user')
    const data = await User.findOne({ user: interaction.user.id })
    const data2 = await User.findOne({ user: user.id  })
    const coins1 = await bitcoin.findUser(user.id, '968570313027780638')
    const coins2 = await bitcoin.findUser(interaction.user.id, '968570313027780638')

    if(coins1.coinsInWallet < 7000 || coins2.coinsInWallet < 7000) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Vocês dois precisa ter pelo menos 7,000 caramelos de saldo, quer mais caramelos? use `/premium buy` ou [visite nosso servidor de suporte](https://discord.gg/jujuba) | [link2](https://discord.gg/7fHTb9ukMd)').setColor('DARK_VIVID_PINK').setFooter({ text: 'Taxa de casamento: 14,000 caramelos | taxa diária: 150 caramelos'})]})

    let embedError = new MessageEmbed()
    .setTitle('Usuário não registrado na database!')
    .setDescription(`Antes de se casar com ${user}, peça a ela/ele para usar um de meus comandos e se registrar na minha database!*`)
    .setColor('RED')

    if(!data2) return interaction.reply({ embeds: [embedError], ephemeral: true})

    if(data.profile.marry.status === 'casado') return interaction.reply({ content: 'Você já está casad@', ephemeral: true})
    if(data2.profile.marry.status === 'casado') return interaction.reply({ content: 'Ahh, alguem ja chegou antes de você!', ephemeral: true})

    let embedCasamentoReady = new MessageEmbed()
    .setTitle(`Pedido de Casamento`)
    .setDescription(`${interaction.user} pediu você em casamento, você aceita?`)
    .setColor('DARK_VIVID_PINK')
    .setFooter({ text: 'Você tem 120 segundos para aceitar'})

    let button1 = new MessageButton()
    .setLabel('Aceitar')
    .setCustomId('aseitar')
    .setStyle('SUCCESS')

    let button2 = new MessageButton()
    .setLabel('Recusar')
    .setCustomId('recusar')
    .setStyle('DANGER')
    let button3 = new MessageButton()
    .setEmoji('🎉')
    .setCustomId('celebrar')
    .setStyle('SECONDARY')
    let button4 = new MessageButton()
    .setEmoji('<:LNE_rosa_presente:1001558399101714502>')
    .setCustomId('presentear')
    .setStyle('PRIMARY')

    const row = new MessageActionRow().addComponents(button1, button2)
    let msg = await interaction.reply({ content: `${user}`, embeds: [embedCasamentoReady], components: [row], fetchReply: true})

    const filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 })

    collector.on("collect", async (i) => {
        let celebrou = 0
        let jafoi = []
        let jadeupresente = []
        let presentes = 0
        if(i.customId === 'aseitar') {
            if(i.user !== user) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})
            await pushMarryForUsers(user.id, 'casado', interaction.user.id, Date.now())
            await pushMarryForUsers(interaction.user.id, 'casado', user.id, Date.now())

            await bitcoin.deductCoins(user.id, '968570313027780638', 7000)
            await bitcoin.deductCoins(interaction.user.id, '968570313027780638', 7000)
            const row2 = new MessageActionRow().addComponents(button3, button4)
            let embedWow = new MessageEmbed()
            .setTitle('Felicidades ao Casal!')
            .setDescription(`${user} e ${interaction.user} acabaram de se casar, espero que você sejam felizes para sempre!`)
            .setColor('DARK_VIVID_PINK')
            i.update({ embeds: [embedWow], components: [row2] })
        } else if(i.customId === 'recusar') {
            if(i.user !== user) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})
            let embedWow = new MessageEmbed()
            .setTitle('Pedido Recusado')
            .setDescription(`${interaction.user}  recusou seu pedido de casamento, el@ não quer você, procure alguém que te ame de verdade ok?`)
            .setColor('RED')
            i.update({ embeds: [embedWow], components: [], content: `${interaction.user}` })
        } else if (i.customId === 'celebrar') {
            if(jafoi.includes(i.user.id)) return i.reply({ content: 'Você já deu parabéns pra eles, ok?', ephemeral: true})
            if(i.user === interaction.user || i.user === user) return i.reply({ content: 'Apenas os convidados podem dar feliz casamento!', ephemeral: true})
            if(celebrou === 3) return i.reply({ content: 'Muitas pessoas já feliz casamento, sinto muito', ephemeral: true})
            celebrou++
            jafoi.push(i.user.id)

            i.reply({ content: `${i.user} **Deu feliz casamento para ${user} & ${interaction.user}!**`})
        } else if(i.customId === 'presentear') {
            if(presentes === 3) return i.reply({ content: 'Já receberam muitos presentes', ephemeral: true})
            if(jadeupresente.includes(i.user.id)) return i.reply({ content: 'Você já deu presente pra eles, ok?', ephemeral: true})
            if(i.user === user || i.user === interaction.user) return i.reply({ content: 'Apenas convidados pode dar presentes!', ephemeral: true})
            const coinswakket = await getUserCoins(i.user)
            presentes++
            if(coinswakket < 1000) return i.reply({ content: 'Você precisa ter 1000 caramelos antes de dar presente aos casad@s!', ephemeral: true})

            await bitcoin.giveCoins(interaction.user.id, '968570313027780638', 500)
            await bitcoin.giveCoins(user.id, '968570313027780638', 500)
            await bitcoin.deductCoins(i.user.id, '968570313027780638', 1000)

            jadeupresente.push(i.user.id)

            i.reply({ content: `${i.user} deu \`1000\` caramelos de presente para [${user} & ${interaction.user}]`})
        }
    })

}

async function getUsersData(user1, user2) {
    const data1 = await User.findOne({ user: user1 })
    const data2 = await User.findOne({ user: user2 })

    return {
        data1,
        data2
    }
}

async function getMarryStatus(user) {
    const data = await User.findOne({ user: user})

    if(data.profile.marry.status === true) return true

    return false
}

async function pushMarryForUsers (user, status, marida, time) {
    const data = await User.findOne({ user: user})
    data.profile.marry.status = status
    data.profile.marry.parent = marida
    data.profile.marry.time = time
    data.badges.push("<:fp_love:1000171194038890566>")
    data.save()
}

async function getUserCoins(user) {
    let coins = await bitcoin.findUser(user.id, '968570313027780638')

    return coins.coinsInWallet
}

