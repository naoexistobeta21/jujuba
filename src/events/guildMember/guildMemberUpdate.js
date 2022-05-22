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
            let array = [
                "968570313027780638",
                "955133657830555728"
            ]

            if(array.includes(newMember.guild.id)) {
                let embed = new Discord.MessageEmbed()
                .setThumbnail('https://cdn.discordapp.com/attachments/967120262510297141/977066479658864670/unknown.png')
                .setColor('#FC039D')
                .setDescription(`Obrigado  pelo booster **<@${newMember.id}>**\nVocê receberá \`1,000,000\` de caramelos como agradecimento, use eles com sabedoria!\n\n\`A equipe da jujuba não devolve caramelos no caso de perder em apostas, se caso for outro motivo da perda envie seu report em: <#971872096017842247>`)

                try {
                    let channel = this.client.channels.cache.get('968691973852639373')
                    let user = this.client.users.cache.get(newMember.user.id)
                    user.send({ embeds: [embed]})
                    channel.send({ embeds: [embed]})
                    await Money.giveCoins(newMember.user.id, '968570313027780638', 1000000)
                } catch (err) {
                    let channel = this.client.channels.cache.get('968691973852639373')
                    channel.send({ embeds: [embed]})
                    await Money.giveCoins(newMember.user.id, '968570313027780638', 1000000)
                }
            }
        }

    }
}