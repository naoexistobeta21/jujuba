//https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${member.user.id}/avatars/${member.avatar}.png?size=4096

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const fetch = require('axios')

module.exports = async (client, interaction, user) => {

let member = interaction.guild.members.cache.get(user.id)

    const button = new MessageButton()
        .setCustomId(`avatar${user.id}`)
        .setLabel('Alternar para avatar do servidor')
        .setStyle('PRIMARY')

        const button2 = new MessageButton()
        .setLabel('Abrir avatar no navegador')
        .setStyle('LINK')
        .setURL(user.displayAvatarURL({ dinamic: true, size: 4096}))

        if(member.displayAvatarURL({ dynamic: true, size: 4096}) === user.displayAvatarURL({ dynamic: true, size: 4096})) {
            button.setDisabled(true)
        }

    const row = new MessageActionRow().addComponents(button2, button)
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_retribuir:977839544013561896> **| Avatar de ${user}!**`)
    .setColor('#ED02B2')
    .setImage(user.displayAvatarURL({ dinamic: true, size: 4096}))
    interaction.reply({ embeds: [embed], components: [row] })

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== interaction.user.id) {
        i.reply({ content: 'Você não pode usar esse botão!', ephemeral: true})
    }
	if (i.customId === `avatar${user.id}`) {
    button.setCustomId(`avatarguild${user.id}`)
    button.setLabel('Alternar para avatar global')
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_retribuir:977839544013561896> **| Avatar de ${user}!**`)
    .setImage(member.displayAvatarURL({ dynamic: true, size: 4096}))
    .setColor('#ED02B2')
    i.update({ embeds: [embed], components: [row] })

	} else if(i.customId === `avatarguild${user.id}`) {
    button.setCustomId(`avatar${user.id}`)
    button.setLabel('Alternar para avatar do servidor')
    const embed = new MessageEmbed()
    .setDescription(`<:jujuba_retribuir:977839544013561896> **| Avatar de ${user}!**`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 4096}))
    .setColor('#ED02B2')
    i.update({ embeds: [embed], components: [row] })
    }
});

collector.on('end', (collected, reason) => {
    if(reason === 'time') {
        button.setDisabled(true)
        interaction.editReply({ components: [row]})
    }
    });

}