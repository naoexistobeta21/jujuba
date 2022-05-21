const Event = require('../../structures/Event')
const Money = require('discord-mongo-currency')
const Discord = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    run = async (oldMember, newMember) => {

        if(oldMember.premiumSince && newMember.premiumSince) {
            if(newMember.guild.id === '968570313027780638') {
                let embed = new Discord.MessageEmbed()
                .setThumbnail('https://cdn.discordapp.com/attachments/967120262510297141/977066479658864670/unknown.png')
                .setColor('#FC039D')
                .setDescription(`Obrigado  pelo booster **${newMember.tag}**\nVocê receberá 1,000,000 de caramelos como agradecimento, use eles com sabedoria!`)

                Money.giveCoins(newMember.user.id, '968570313027780638', 1000000)
                
                try {
                    let channel = this.client.channels.cache.get('968691973852639373')
                    let user = this.client.users.cache.get(newMember.user.id)
                    user.send({ embeds: [embed]})
                    channel.send({ embeds: [embed]})
                } catch (err) {
                    let channel = this.client.channels.cache.get('968691973852639373')
                    channel.send({ embeds: [embed]})
                }
            }
        }

    }
}