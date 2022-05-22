const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = (client, interaction) => {
    const user = interaction.options.getUser('usuário')

    if(user.bot) return interaction.reply({ content: 'Desculpe, mas acho que essa quimica com robôs não funciona!', ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: 'Credo, não permitirei isso, as pessoas podem achar que você é louco.', ephemeral: true})

    let images = [
        "https://i.pinimg.com/originals/d0/2c/8a/d02c8a5df26f288588339d57188075d5.gif",
        "https://media2.giphy.com/media/Ue55CpP8r1lAc/giphy.gif?cid=790b76118fe75ff6a71e7862422b1ebe3e36ea57f2f63bb0&rid=giphy.gif",
        "https://i.pinimg.com/originals/91/c3/19/91c31977aa79847203c10fbd6d2bc1c7.gif"
    ]

    const button = new MessageButton()
        .setCustomId(`dance${user.id}`)
        .setLabel('Retribuir')
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = images[Math.floor(Math.random() * images.length)]
    const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${interaction.user} arrasou no baile com ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    interaction.reply({ content: `${user}`, embeds: [embed], components: [row] })

    const filter = i => i.user.id === i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) {
        i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    }
	if (i.customId === `dance${user.id}`) {
        let response = images[Math.floor(Math.random() * images.length)]
        const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${user} retribuiu a dança de ${interaction.user}!**`)
    .setImage(response)
    .setColor('#ED02B2')
    i.reply({ content: `${interaction.user}`, embeds: [embed], components: [] })
    interaction.editReply({ components: [] })

	}
});

collector.on('end', collected => { return interaction.editReply({ components: []})});
     
}