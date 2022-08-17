const { MessageEmbed, MessageActionRow } = require('discord.js')
const Broker = require('../../database/Schemas/broker.js')

module.exports = async (client, interaction) => {
    let user = await Broker.findOne({ user: interaction.user.id })
    if(user) return interaction.reply({ content: 'Voce já é registrado no mercado de ações!', ephemeral: true })

    let salvar = new Broker({
        user: interaction.user.id,
        actions: [
            {
                name: 'JUJUBR',
                price: 20,
                porcent: 2,
                info: 'Esta é uma ação inicial, por tanto não muda a porcentagem de lucro!'
            }
        ]
    })
    salvar.save()

    interaction.reply({ content: 'Você foi registrado no mercado de ações e ganhará uma ação para começar !', ephemeral: true})
}