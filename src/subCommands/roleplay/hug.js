const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = (client, interaction) => {
    const user = interaction.options.getUser('usuário')

    if(user.bot) return interaction.reply({ content: 'um bot não tem sentimentos', ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: 'Ta carente? compra um hamister.', ephemeral: true})

    let images = [
        "https://uploads.spiritfanfiction.com/historias/capitulos/201812/my-sweet-protection-15029395-021220180037.gif",
    ]

    const button = new MessageButton()
        .setCustomId(`hug${user.id}`)
        .setLabel('Retribuir')
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = images[Math.floor(Math.random() * images.length)]
    const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${interaction.user} abraçou ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    interaction.reply({ content: `${user}`, embeds: [embed], components: [row] })

    const filter = i => i.user.id === i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) {
        i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    }
	if (i.customId === `hug${user.id}`) {
        let response = images[Math.floor(Math.random() * images.length)]
        const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${user} retribuiu o abraço de ${interaction.user}!**`)
    .setImage(response)
    .setColor('#ED02B2')
    i.reply({ content: `${interaction.user}`, embeds: [embed], components: [] })
    interaction.editReply({ components: [] })

	}
});

collector.on('end', collected => { return interaction.editReply({ components: []})});
     
}