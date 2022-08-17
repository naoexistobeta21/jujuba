const { MessageEmbed, MessageActionRow } = require('discord.js')
const Broker = require('../../database/Schemas/broker.js')

module.exports = async (client, interaction) => {
    let user = await Broker.findOne({ user: interaction.user.id })
    if(!user) return interaction.reply({ content: 'Você não tem uma conta no mercado de ações!', ephemeral: true })

    interaction.reply({ content: 'O Mercado de ações está fechada para manutenção no servidor!', ephemeral: true})
}