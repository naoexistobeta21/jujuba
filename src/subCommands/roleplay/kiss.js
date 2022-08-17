const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const t = require('./functions/gifs.js')
module.exports = async (client, interaction) => {
    const user = interaction.options.getUser('usuário')

    if(user.bot) return interaction.reply({ content: 'Desculpe, mas acho que essa quimica com robôs não funciona!', ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: 'Que pena, eu também queria aprender a me auto-beijar, pena que não tem como.', ephemeral: true})


    const button = new MessageButton()
        .setCustomId(`kiss${user.id}`)
        .setLabel('Retribuir')
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = await t.kiss()
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_kiss:977834039182520330> **| ${interaction.user} beijou ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    interaction.reply({ content: `${user}`, embeds: [embed], components: [row] })

    const filter = i => i.user.id === i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) return i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    
	if (i.customId === `kiss${user.id}`) {
        let response = images[Math.floor(Math.random() * images.length)]
        const embed = new MessageEmbed()
    .setDescription(`<:jujuba_kiss:977834039182520330> **| ${user} retribuiu o beijo de ${interaction.user}!**`)
    .setImage(response)
    .setColor('#ED02B2')
    i.reply({ content: `${interaction.user}`, embeds: [embed], components: [] })
    interaction.editReply({ components: [] })

	}
});

collector.on('end', collected => {});
     
}