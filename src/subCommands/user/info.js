//https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${member.user.id}/avatars/${member.avatar}.png?size=4096
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')

module.exports = async (client, interaction, membro) => {
    let user = interaction.guild.members.cache.get(membro.id)
    let roles = await getRoles(user)
    let id = user.id
    let member = client.users.cache.get(membro.id)
    let perms = await getPermissions(user)

    const button = new MessageButton()
    .setLabel('Cargos filosóficos')
    .setStyle('PRIMARY')
    .setEmoji('<:roleicon:1002961355923533844>')
    .setCustomId('permissionsuser')

    const row = new MessageActionRow().addComponents(button)
    const embed = new MessageEmbed()
    .setColor('DARK_VIVID_PINK')
    .setTitle(` **Informações de ${user.user.tag}**`)
    .setDescription(`\n**ID:**\`${id}\` (${interaction.guild.ownerId === user.id ? 'Owner' : 'Member'})\n**Conta criada:** <t:${~~(membro.createdAt / 1000)}> (<t:${~~(membro.createdAt / 1000)}:R>)\n**Entrou aqui em:** <t:${~~(user.joinedTimestamp / 1000)}>(<t:${~~(user.joinedTimestamp / 1000)}:R>)\n**Cargos adicionados:** ${user._roles.length}\n**Cargo mais alto:** <@&${user.roles.highest.id}>`)
    .setFields(
        {
            name: 'Permissões',
            value: `${perms}`
        }
        )
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    let msg = await interaction.reply({embeds: [embed], components: [row], fetchReply: true})
    let filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

    collector.on('collect', async (i) => {
        //if(i.user.id !== interaction.user.id) return i.reply({ content: 'Sai daqui, isso não é pra você!'})
        let embedPerms = new MessageEmbed()
        .setTitle('Cargos filosóficos')
        .setDescription(`${roles}`)
        .setColor('DARK_VIVID_PINK')
        i.reply({ embeds: [embedPerms], ephemeral: true})

        
    })
}

async function getRoles(user) {
    let array = []
    for(let i = 0;i < user._roles.length;i++) {
        array.push(`<@&${user._roles[i]}>`)
    }
    return shorten(array.join(" "), 3996)
}

async function getPermissions(coll) {
    let arr = new Array()
                    if (coll.permissions.has('CREATE_INSTANT_INVITE'))
                    arr.push(`\`Criar convite instantâneo\``)
                    if (coll.permissions.has('ADMINISTRATOR'))
                    arr.push(`\`Administrador\``)
                    if (coll.permissions.has('KICK_MEMBERS'))
                    arr.push(`\`Expulsar membros\``)
                    if (coll.permissions.has('BAN_MEMBERS'))
                    arr.push(`\`Banir membros\``)
                    if (coll.permissions.has('MANAGE_CHANNELS'))
                    arr.push(`\`Gerenciar canais\``)
                    if (coll.permissions.has('MANAGE_GUILD'))
                    arr.push(`\`Gerenciar servidor\``)
                    if (coll.permissions.has('ADD_REACTIONS'))
                    arr.push(`\`Adicionar reações\``)
                    if (coll.permissions.has('VIEW_AUDIT_LOG'))
                    arr.push(`\`Ver registro de auditoria\``)
                    if (coll.permissions.has('PRIORITY_SPEAKER'))
                    arr.push(`\`Voz Prioritária\``)
                    if (coll.permissions.has('STREAM'))
                    arr.push(`\`Ao vivo\``)
                    if (coll.permissions.has('SEND_MESSAGES'))
                    arr.push(`\`Enviar mensagens\``)
                    if (coll.permissions.has('SEND_TTS_MESSAGES'))
                    arr.push(`\`Enviar mensagens em TTS\``)
                    if (coll.permissions.has('VIEW_CHANNEL'))
                    arr.push(`\`Ver canais\``)
                    if (coll.permissions.has('MANAGE_MESSAGES'))
                    arr.push(`\`Gerenciar mensagens\``)
                    if (coll.permissions.has('EMBED_LINKS'))
                    arr.push(`\`Enviar links\``)
                    if (coll.permissions.has('ATTACH_FILES'))
                    arr.push(`\`Enviar arquivos\``)
                    if (coll.permissions.has('READ_MESSAGE_HISTORY'))
                    arr.push(`\`Ler histórico de mensagem\``)
                    if (coll.permissions.has('MENTION_EVERYONE'))
                    arr.push(`\`Mencionar everyone e cargos\``)
                    if (coll.permissions.has('USE_EXTERNAL_EMOJIS'))
                    arr.push(`\`Usar emojis externos\``)
                    if (coll.permissions.has('USE_EXTERNAL_STICKERS'))
                    arr.push(`\`Usar figurinhas externas\``)
                    if (coll.permissions.has('VIEW_GUILD_INSIGHTS'))
                    arr.push(`\`Ver análises do servidor\``)
                    if (coll.permissions.has('CONNECT'))
                    arr.push(`\`Conectar\``)
                    if (coll.permissions.has('SPEAK'))
                    arr.push(`\`Falar\``)
                    if (coll.permissions.has('MUTE_MEMBERS'))
                    arr.push(`\`Mutar membros\``)
                    if (coll.permissions.has('DEAFEN_MEMBERS'))
                    arr.push(`\`Ensurdecer Membros\``)
                    if (coll.permissions.has('MOVE_MEMBERS'))
                    arr.push(`\`Mover membros\``)
                    if (coll.permissions.has('CHANGE_NICKNAME'))
                    arr.push(`\`Alterar apelido\``)
                    if (coll.permissions.has('MANAGE_NICKNAMES'))
                    arr.push(`\`Gerenciar apelidos\``)
                    if (coll.permissions.has('MANAGE_ROLES'))
                    arr.push(`\`Gerenciar cargos\``)
                    if (coll.permissions.has('MANAGE_WEBHOOKS'))
                    arr.push(`\`Gerenciar webhooks\``)
                    if (coll.permissions.has('MANAGE_EMOJIS_AND_STICKERS'))
                    arr.push(`\`Gerenciar emojis e figurinhas\``)
                    if (coll.permissions.has('USE_APPLICATION_COMMANDS'))
                    arr.push(`\`Usar comandos de /\``)
                    if (coll.permissions.has('REQUEST_TO_SPEAK'))
                    arr.push(`\`Pedir para falar\``)
                    if (coll.permissions.has('MANAGE_EVENTS'))
                    arr.push(`\`Gerenciar eventos\``)
                    if (coll.permissions.has('MANAGE_THREADS'))
                    arr.push(`\`Gerenciar Threads\``)
                    if (coll.permissions.has('USE_PUBLIC_THREADS') || coll.permissions.has('USE_PRIVATE_THREADS') || coll.permissions.has('SEND_MESSAGES_IN_THREADS'))
                    arr.push(`\`Falar em threads\``)
                    if (coll.permissions.has('CREATE_PUBLIC_THREADS'))
                    arr.push(`\`Criar threads públicos\``)
                    if (coll.permissions.has('CREATE_PRIVATE_THREADS'))
                    arr.push(`\`Criar threads privados\``)
                    if (coll.permissions.has('START_EMBEDDED_ACTIVITIES'))
                    arr.push(`\`Iniciar atividades\``)
                    if (coll.permissions.has('MODERATE_MEMBERS'))
                    arr.push(`\`Gerenciar moderação do servidor\``)
                    if (coll.permissions.has('USE_VAD'))
                    arr.push(`\`Utilizar detecção de voz\``)

        return arr
}

function shorten(text, len) {
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }
