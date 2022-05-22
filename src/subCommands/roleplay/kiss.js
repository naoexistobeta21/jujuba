const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = (client, interaction) => {
    const user = interaction.options.getUser('usuário')

    if(user.bot) return interaction.reply({ content: 'Desculpe, mas acho que essa quimica com robôs não funciona!', ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: 'Que pena, eu também queria aprender a me auto-beijar, pena que não tem como.', ephemeral: true})

    let images = [
        "https://64.media.tumblr.com/4d6bbd48e8ed41bb3b1e0ec57b4d4bfe/2d11a74f7fb5db42-4b/s500x750/9b3dc5024eaecddb9b57bf521a6f1ba830ee4db4.gif",
        "https://c.tenor.com/ailNw3Ujd00AAAAC/bubbline-princess-bubblegum.gif",
        "https://miro.medium.com/max/996/1*Nx_BzBxAVFVdzq-LgciYNg.gif",
        "https://static.wikia.nocookie.net/tudosobrehoradeaventura/images/b/b9/MarcelinePJGif2.gif.gif/revision/latest/scale-to-width-down/540?cb=20210604213936&path-prefix=pt-br"
    ]

    const button = new MessageButton()
        .setCustomId(`kiss${user.id}`)
        .setLabel('Retribuir')
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = images[Math.floor(Math.random() * images.length)]
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_kiss:977834039182520330> **| ${interaction.user} beijou ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    interaction.reply({ content: `${user}`, embeds: [embed], components: [row] })

    const filter = i => i.user.id === i.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) {
        i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    }
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

collector.on('end', collected => { return interaction.editReply({ components: []})});
     
}