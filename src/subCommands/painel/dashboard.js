const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu, Permissions } = require('discord.js')
const Guild = require('../../database/Schemas/Guild')
module.exports = async (client, interaction) => {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Você precisa da permisão `ADMINISTRATOR`para executar esse comando!', ephemeral: true })

    const db = await Guild.findOne({ server: interaction.guild.id })

    const button = new MessageButton()
    .setLabel('Boas Vindas')
    .setStyle('PRIMARY')
    .setCustomId('welcomer')

    const YesWelcome = new MessageButton()
    .setLabel('Sim')
    .setCustomId('simwelcome')
    .setStyle('SUCCESS')
    const NoWelcome = new MessageButton()
    .setLabel('Não')
    .setCustomId('naowelcome')
    .setStyle('DANGER')

    const oa = new MessageButton()
    .setLabel('Desativar')
    .setCustomId('desativar')
    .setStyle('DANGER')

    const ant = new MessageButton()
    .setLabel('Anti-link')
    .setCustomId('antlink')
    .setStyle('PRIMARY')

    const audit = new MessageButton()
    .setLabel('Audit Logs')
    .setCustomId('audit')
    .setStyle('PRIMARY')

    const auditS = new MessageButton()
    .setLabel('Sim')
    .setCustomId('auditS')
    .setStyle('SUCCESS')

    const auditN = new MessageButton()
    .setLabel('Não')
    .setCustomId('auditN')
    .setStyle('DANGER')

    const NoAnt = new MessageButton()
    .setLabel('Não')
    .setCustomId('noant')
    .setStyle('DANGER')

    const YesAnt = new MessageButton()
    .setLabel('Sim')
    .setCustomId('yesant')
    .setStyle('SUCCESS')


    const row = new MessageActionRow().addComponents(button, ant, audit)
    const row2 = new MessageActionRow().addComponents(YesWelcome, NoWelcome)
    const row3 = new MessageActionRow().addComponents(oa)
    const ant1 = new MessageActionRow().addComponents(YesAnt, NoAnt)

    const ad = new MessageActionRow().addComponents(auditS, auditN)

    /*

antilink: {
      status: {type: Boolean, default: false},
      admins: {type: Array, default: []},
    },

    */

        let editado = new MessageEmbed()
        .setTitle('Painel de Configuração (Only Admins)')
        .setDescription('\n> **Boas-vindas** ( configure a mensagem, canal, tempo e etc )\n> **Anti-link** ( pessoas sem permissões MANAGE_MESSAGES não poderão enviar links )\n> **Audit LOG**  Monitore tudo que acontece no servidor!')
        .setColor('#038cfc')
        let msg = await interaction.reply({ embeds: [editado], components: [row], fetchReply: true})

        const filter = user => user
        const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 })

        collector.on('collect', async (i) => {
            if(i.user !== interaction.user) return i.reply({ content: 'Suspeito, sai daqui!', ephemeral: true})

            if(i.customId === 'welcomer') {
                if(db.botconfig.welcome.status === true) return i.update({ content: 'Este servidor já possui mensagem de boas vindas ativada!', components: [row3]})
                i.update({ embeds: [], content: 'Você deseja ativar a mensagem de boas vindas?\n\n\```js\n{@user} Seja bem vindo ao {guild.name},\nVocê é o membro #{guild.memberCount}, espero que goste do nosso servidor!\n```\n**Tempo pra apagar:** 30 segundos', components: [row2]})

            } else if(i.customId === 'simwelcome') {
                const channels = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']) && c.permissionsFor(interaction.user.id).has('SEND_MESSAGES') && c.permissionsFor(interaction.guild.id).has(['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']))

    if (!channels.size) return i.reply({ content: 'Não consigo enviar a mensagem em nenhum dos canais do servidor.', ephemeral: true })
    if(channels.size > 25) return i.reply({ content: 'Seu servidor tem mais de 25 canais que o membros tem a permissão de: `READ_MESSAGE_HISTORY` & `VIEW_CHANNEL`, por tanto não vou poder permitir essa ação.'})

        const actionRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId('channelSelect')
                    .setPlaceholder('Selecione um canal')
                    .addOptions(
                        channels
                            .map(c => {
                                return {
                                    label: c.name,
                                    value: c.id
                                }
                            })
                    )
            ])
                db.botconfig.welcome.status = true
                i.update({ content: 'Em qual canal eu devo enviar a mensagem de boas vindas?', components: [actionRow]})
            } else if(i.customId === 'naowelcome') {
                db.botconfig.welcome.status = true
                i.update({ content: 'Ação cancelada', components: []})
            } else if(i.customId === 'channelSelect') {
                db.botconfig.welcome.channel = i.values[0]
                db.save()
                i.update({ content: `Canal de boas vindas setado como: <#${i.values[0]}>`, components: []})
            } else if(i.customId === 'desativar') {
                db.botconfig.welcome.status = false
                db.save()
                i.update({ content: 'Mensagem desativada', components: []})
            } else if(i.customId === 'antlink') {
                if(db.botconfig.antilink.status === false) {
                    i.update({ content: 'Você deseja ativar o anti-link pra esse servidor?', components: [ant1], embeds: []})
                } else {
                    NoAnt.setLabel('Desativar')
                    YesAnt.setDisabled(true)
                    i.update({ content: 'Sistema anti-link já está ativado, deseja desativar?', components: [ant1], embeds: []})
                }
            } else if(i.customId === 'noant') {
                db.botconfig.antilink.status = false
                db.save()
                i.update({ content: 'Sistema de anti-link desativado', components: [], embeds: []})
            } else if(i.customId === 'yesant') {
                db.botconfig.antilink.status = true
                db.save()
                i.update({ content: 'Sistema de anti-link ativado', components: [], embeds: []})
            } else if(i.customId === 'audit') {
                if(db.botconfig.logs.status !== true) {
                    i.update({ content: 'Deseja ativar o sistema de registro de auditoria?', embeds: [], components: [ad]})
                } else {
                    auditS.setDisabled(true)
                    auditN.setLabel('Desativar')
                    i.update({ content: 'Este servidor já está usando o sistema de audit logs', embeds: [], components: [ad]})
                }
            } else if(i.customId === 'auditS') {
                i.update({ content: 'Aguarde...', components: [], embeds: []})
                let channel = await interaction.guild.channels.create('audit-logs', {
                    type: 'GUILD_TEXT',
                    reason: 'Create audit Logs',
                    permissionOverwrites: [
                       {
                         id: interaction.guild.id,
                         deny: [Permissions.FLAGS.VIEW_CHANNEL],
                      },
                    ],
                  }).catch(console.log('nodes'))
                
                let web = await interaction.guild.channels.createWebhook(channel.id, 'Jujuba', {
                    avatar: 'https://i.imgur.com/TDwzukE.png',
                    reason: 'Audit Logs webhook'
                  }).catch(console.log('Audit Log failed'))

                db.webhook.id = web.id
                db.webhook.token = web.token
                db.webhook.channel = channel.id
                db.botconfig.logs.status = true
                db.save()

                i.editReply({ content: 'Logs ativada', components: [], embeds: []})
            } else if(i.customId === 'auditN') {
                if(db.botconfig.logs.status === true) {
                    db.botconfig.logs.status = false
                    db.save()
                    i.update({ content: 'Logs desativada', components: [], embeds: []})
                } else {
                    i.update({ content: '...', components: [], embeds: []})
                }
                
            }

        })
        
}
