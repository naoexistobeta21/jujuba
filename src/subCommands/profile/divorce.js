const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const Levels = require("discord-xp");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const User = require('../../database/Schemas/User')


module.exports = async (client, interaction, t) => {
    const data = await User.findOne({ user: interaction.user.id})
    const user = client.users.cache.get(data.profile.marry.parent)
    const data2 = await User.findOne({ user: user.id })

    if(data.profile.marry.status !== 'casado') return interaction.reply({ content: 'Você não esta casad@!'})



    let embedError = new MessageEmbed()
    .setTitle('Usuário não registrado na database!')
    .setDescription(`Antes de se casar com ${user}, peça a ela/ele para usar um de meus comandos e se registrar na minha database!*`)
    .setColor('RED')

    if(!data2) return interaction.reply({ embeds: [embedError], ephemeral: true})

    let embedCasamentoReady = new MessageEmbed()
    .setTitle(`Divórcio`)
    .setDescription(`${interaction.user} Tem certeza que você quer divorcio? o casamento de vocês é tãoo lindooo <3`)
    .setColor('DARK_VIVID_PINK')
    .setFooter({ text: 'Você tem 120 segundos para divorciar'})

    let button1 = new MessageButton()
    .setLabel('Sim')
    .setCustomId('aseitar')
    .setStyle('SUCCESS')

    let button2 = new MessageButton()
    .setLabel('Não')
    .setCustomId('recusar')
    .setStyle('DANGER')

    const row = new MessageActionRow().addComponents(button1, button2)
    let msg = await interaction.reply({ content: `${interaction.user}`, embeds: [embedCasamentoReady], components: [row], fetchReply: true})

    const filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 })

    collector.on("collect", async (i) => {
        if(i.customId === 'aseitar') {
            if(i.user !== interaction.user) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})
            await pushMarryForUsers(user.id, 'solteiro', interaction.user.id, Date.now())
            await pushMarryForUsers(interaction.user.id, 'solteiro', user.id, Date.now())


            let embedWow = new MessageEmbed()
            .setTitle('Divórcio')
            .setDescription(`Foi uma aventura e tanto, pena que ${interaction.user} não deu o próximo passo, espero que um dia vocês encontrem seu amor eterno!`)
            .setColor('RED')
            i.update({ embeds: [embedWow], components: [] })

            try{
                user.send({ embeds: [embedWow], content: `${interaction.user} pediu divórcio!`})
            } catch (err) {
                interaction.channel.send({ content: `${user} Espero que ache alguém melhor!`})
            }
        } else if(i.customId === 'recusar') {
            if(i.user !== interaction.user) return i.reply({ content: 'Sai daqui, isso não é pra você!', ephemeral: true})
            let embedWow = new MessageEmbed()
            .setTitle('Divorcio Cancelado')
            .setDescription(`Ainda bem, eu não suportaria viver em um mundo sem o amor de vocês!`)
            .setColor('DARK_VIVID_PINK')
            i.update({ embeds: [embedWow], components: [] })
        }
    })

}


async function pushMarryForUsers (user, status, marida, time) {
    const data = await User.findOne({ user: user})
    data.profile.marry.status = status
    data.profile.marry.parent = marida
    data.profile.marry.time = time
    data.badges.remove('<:fp_love:1000171194038890566>')
    data.save()
}


