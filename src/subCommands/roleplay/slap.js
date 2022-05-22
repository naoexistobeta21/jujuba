const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = (client, interaction) => {
    const user = interaction.options.getUser('usuário')

    if(user.bot) return interaction.reply({ content: 'Não posso deixar que você faça isso, pois pode machucar sua mãozinha <3', ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: 'Vai se tratar ok ?', ephemeral: true})

    let images = [
        "https://64.media.tumblr.com/821efef2f7125c9f362d7391c1414ba8/tumblr_pzkh6mHF4B1slcujao3_500.gif",
    ]

    const button = new MessageButton()
        .setCustomId(`slap${user.id}`)
        .setLabel('Retribuir')
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = images[Math.floor(Math.random() * images.length)]
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_slap:977854296773230624> **| ${interaction.user} deu um tapa em ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    interaction.reply({ content: `${user}`, embeds: [embed], components: [row] })

    const filter = i => i.user.id === i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) {
        i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    }
	if (i.customId === `slap${user.id}`) {
        let response = images[Math.floor(Math.random() * images.length)]
        const embed = new MessageEmbed()
    .setDescription(`<:jujuba_slap:977854296773230624> **| ${user} revidou o tapa de ${interaction.user}!**`)
    .setImage(response)
    .setColor('#ED02B2')
    i.reply({ content: `${interaction.user}`, embeds: [embed], components: [] })
    interaction.editReply({ components: [] })

	}
});

collector.on('end', collected => { return interaction.editReply({ components: []})});
     
}