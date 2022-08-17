const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}


module.exports = async (client, interaction) => {
        
        //interaction.channel.sendTyping()

        let user = await User.findOne({ user: interaction.user.id })
        let timeout = 86400000
        let daily = user.profile.daily.time
        let valor = 3600
        if(user.status.premium.type === 'ouro') valor = 3600 * 2.5
        if(user.status.premium.type === 'bronze') valor = 3600 * 2
        if(user.status.premium.type === 'diamante') valor = 3600 * 3
        let random = Math.floor(Math.random() * valor )


        if(daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let dailyOff = new MessageEmbed()
        .setTitle('Daily Reward')
        .setColor('#fa05a8')
        .setDescription(`Você já pegou seu daily reward hoje, volte em ${time}\n\nQuer mais caramelos? use o comando \`/premium buy\`\nPra que serve os caramelos ? , você pode usar para comprar backgrounds, pagar usuários, comprar layouts, e usar comandos de games!`)
        
        interaction.reply({embeds: [dailyOff], ephemeral: true}) } else {
            const button = new MessageButton()
    .setLabel('Resgatar Daily')
    .setStyle('SUCCESS')
    .setCustomId(`DailyReward${interaction.user.id}`)

    const row = new MessageActionRow().addComponents(button)

        let editado = new MessageEmbed()
        .setTitle('Daily Reward')
        .setDescription('<:jujuba_wow:981613679843885056> Por favor, siga as regras do daily reward!\n\`1\` - Não utilize contas alts para obter vantagens\n\`2\` - O Daily só pode ser pego 1 vez no dia, caso tente burlar isso será banido!\n\`3\` - Ao pegar o daily, por favor não seja tóxico com os outros membros, eles são pobres.\n\`4\` - Seja feliz e educado, você é especial!')
        .setColor('#fa05a8')

        let Rewarded = new MessageEmbed()
        .setDescription(`<:wumpus_corao:991799564858294364> Você ganhou ${random} no daily reward, volte em 24 horas!\n<:emoji_23:989282906834870282> Quer mais caramelos? use o comando \`/premium buy\``)
        .setColor('#fa05a8')

        await interaction.reply({ embeds: [editado], components: [row]})

            const filter = i => i.user.id === interaction.user.id
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === `DailyReward${interaction.user.id}`) {
                    db.giveCoins(interaction.user.id, '968570313027780638', random)
                    user.profile.daily.time = Date.now()
                    user.save()
                    i.update({ embeds: [Rewarded], components: []})
                }
            })
            }
        

    }