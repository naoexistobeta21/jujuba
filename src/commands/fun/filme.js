const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas')
const Command = require('../../structures/Command')
const movie = require('movier')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'filme',
            description: '[ 😂 DIVERSAO ] pesquise filmes e series.',
            options: [
                {
                    type: 'STRING',
                    name: 'nome',
                    description: 'digite o filme que você queira procurar.',
                    required: true
        }
            ]
        })
    }

    run = async (interaction) => {
    const assunto = interaction.options.getString('nome')
    
    try{
        try{
            let filme = await movie.getTitleDetailsByName(assunto)
            } catch (err) {
                interaction.reply({ content: 'não encontrei nenhum filme em mseu servidores', ephemeral: true})
               }
    let languages = []
    let content = " "
    for(let i = 0;i < filme.languages.length;i++) {
    //languages.push(filme.languages[i])
        content += `\`${filme.languages[i]}\`,`
    }
    if(!filme) return interaction.reply({ content: '*Eu não achei nenhum titulo com esse nome*', ephemeral: true})
        const button = new Discord.MessageButton()
        .setLabel(`Ver`)
        .setStyle('LINK')
        .setURL(filme.mainSource.sourceUrl)
        
        const button2 = new Discord.MessageButton()
        .setLabel(`Enviado por: ${interaction.user.username}`)
        .setStyle('PRIMARY')
        .setCustomId('coisea')
        .setDisabled(true)

        const row = new Discord.MessageActionRow().addComponents(button, button2)
        const embed = new Discord.MessageEmbed()
        .setDescription(`**__Pesquisa:__** \`${assunto}\`\n**__Titulo:__** \`${filme.worldWideName}\`\n**__Ano de lançamento:__** \`${filme.dates.titleYear}\`\n**__País de origem:__** \`${filme.dates.startCountry}\`\n**__Idiomas:__** ${content}\n**__Avaliação:__** \`${filme.mainRate.rate}/10\``)
        .setImage(filme.posterImage.url)
        .setColor('#FC03FC')
        interaction.reply({ embeds: [embed], components: [row]})
    } catch (err) {
        interaction.reply({ content: '*Não achei nenhum filme com esse titulo em meus servidores*', ephemeral: true})
    }
    
    }
}

function shorten(text, len) {
    if (typeof text !== "string") return "";
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "\n";
  }


  function verificar(string) {
    let link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  
    if (link.test(string)) return true;
    return false;
  }