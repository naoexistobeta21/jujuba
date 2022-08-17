const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = async (client, interaction) => {

    const button = new MessageButton()
    .setLabel('Ver')
    .setStyle('LINK')
    .setURL('https://www.themoviedb.org/movie/616037-thor-love-and-thunder')

    const row = new MessageActionRow().addComponents(button)

        let editado = new MessageEmbed()
        .setTitle('Thor: Amor e Trovão (2022)')
        .setDescription('Thor parte em uma jornada diferente de tudo que já enfrentou – uma busca pela paz interior. Mas sua aposentadoria é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro de Deus, que busca a extinção dos deuses. Para combater a ameaça, Thor pede a ajuda do Rei Valquíria, Korg e da ex-namorada Jane Foster, que – para surpresa de Thor – inexplicavelmente empunha seu martelo mágico, Mjolnir, como o Poderoso Thor. Juntos, eles embarcam em uma angustiante aventura cósmica para descobrir o mistério da vingança do God Butcher e detê-lo antes que seja tarde demais.')
        .setColor('#038cfc')
        .setImage('https://www.themoviedb.org/t/p/original/9stSj68nRpNCQkqn67h3sTMoBUe.jpg')
        interaction.reply({ embeds: [editado], components: [row]})

        
}