const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const TMDB = require('tmdb')
const apiKey = '51affe99e3b436df9dcb09eb1ff4461d'
module.exports = async (client, interaction) => {
    const filme = interaction.options.getString('name')

    let embed = new MessageEmbed()
    .setDescription(`<a:Load:991154788714692678> Procurando por: ${filme}`)
    .setColor('LUMINOUS_VIVID_PINK')

    await interaction.reply({ embeds: [embed]})
    const tmdb = new TMDB.Tmdb(apiKey);
    
    try{
        let movie = await tmdb.get('search/movie', {
            query: filme,
          });

        //if(movie.results[0].adult && movie.results[0].adult !== false) return interaction.editReply({ embeds: [adultMovie]})
    //https://www.themoviedb.org/movie/
    const button = new MessageButton()
        .setLabel('Ver')
        .setStyle('LINK')
        .setURL('https://www.themoviedb.org/movie/' + movie.results[0].id)

        const row = new MessageActionRow().addComponents(button)
        let editado = new MessageEmbed()
        .setTitle(movie.results[0].title)
        .setDescription(movie.results[0].overview)
        .setColor('#038cfc')
        .setImage('https://image.tmdb.org/t/p/w1066_and_h600_bestv2' + movie.results[0].backdropPath)
        interaction.editReply({ embeds: [editado], components: [row]})
    } catch (err) {
        let not = new MessageEmbed()
        .setDescription('Não achei esse filme em meus servidores!')
        .setColor('RED')
        
        interaction.editReply({ embeds: [not]})
    }
    
}