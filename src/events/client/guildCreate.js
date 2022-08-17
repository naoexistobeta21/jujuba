const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
const Discord = require('discord.js')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        })
    }

    run = async (guild) => {
        if(guild.memberCount < 10) return noUsers(this.client.users.cache.get(guild.ownerId), guild)

        let bots = guild.members.cache.filter(m => m.user.bot).size
        let membros = guild.members.cache.filter(m => m.user.bot === false).size
        if(bots > membros) return noBots(this.client.users.cache.get(guild.ownerId), guild)
        let guild_verify = await Guild.findOne({
            server: guild.id
        });

        if(!guild_verify) {
            let newData = new Guild({
                server: guild.id,
            })
            newData.save();
        }

        let button = new Discord.MessageButton()
        .setLabel('Votar na Jujuba')
        .setStyle('LINK')
        .setURL('https://top.gg/bot/970134090152034354')

        const row = new Discord.MessageActionRow().addComponents(button)

        let embed = new Discord.MessageEmbed()
        .setTitle('Obrigado por me adicionar!')
        .setDescription(`**__Servidor:__** ${guild.name} (\`${guild.id}\`)\n**__Quantidade de membros:__** ${guild.members.cache.size}\n**__Dono:__** ${guild.ownerId ? this.client.users.cache.get(guild.ownerId).tag : '???'}`)
        .setColor('DARK_VIVID_PINK')
        .setFooter({ text: 'Quer ganhar caramelos? Vote na Jujuba!'})

        const user = this.client.users.cache.get(guild.onwerId)


        try {
            user.send({ embeds: [embed], components: [row]})
        } catch (err) {
            return;
        }
    }
}

async function noBots(user, guild) {
    
    try{
        user.send({ content: 'Seu servidor tem mais bots do que membros, estou saindo... volto quando tiver mais membros do que bots!'})
        guild.leave()
    } catch(err) {
        guild.leave()
    }
}

async function noUsers(user, guild) {
    try{
        user.send({ content: 'Seu servidor tem poucos membros, necessário pelo menos 10 membros pra eu ficar no servidor!'})
        guild.leave()
    } catch(err) {
        guild.leave()
    }
}