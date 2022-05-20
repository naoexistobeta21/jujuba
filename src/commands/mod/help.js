const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'veja meus comandos.'
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()

        const actionRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId('channelSelect')
                    .setPlaceholder('Selecione um item')
                    .addOptions(
                        {
                            label: 'Moderação',
                            emoji: '<:mod:970343066244374569>',
                            value: 'mod',
                            description: 'Comandos de moderação.'
                        },
                        {
                            label: 'Nitro Classic (Anual)',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'classic_anual',
                            description: 'Nitro Classic 1 ano'
                        },
                        {
                            label: 'Nitro Gaming (Mensal)',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'gaming_mensal',
                            description: 'Nitro Gaming 1 mes'
                        },
                        {
                            label: 'Nitro Classic (Mensal)',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'classic_mensal',
                            description: 'Nitro Classic 1 mes'
                        },
                        {
                            label: 'Link',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'link_nitro',
                            description: 'Receba o link'
                        },
                        {
                            label: 'Link + Ativação',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'link_ativacao_nitro',
                            description: 'Receba o link e ative junto'
                        },
                        {
                            label: 'Conta com nitro trimensal',
                            emoji: '<:nitro:969815002116685855>',
                            value: 'nitro_trimensal_conta',
                            description: 'Receba email e senha'
                        },


                    )
            ])

            let embeds = new MessageEmbed()
            .setDescription(`Por enquanto não tem nada aqui, contente-se com este gif feito por: <@947856944515936306>`)
            .setColor('RED')
            .setImage('https://cdn.discordapp.com/attachments/970481305504608256/971587675654074448/gifffff.gif')

        const reply = await interaction.reply({
            content: ' ',
            embeds: [embeds],
            //components: [actionRow],
            fetchReply: true
        })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1}) // time: (3 * 60000) 

        collector.on('collect', async (i) => {
            if(i.user.id === interaction.user.id) {
                            
            const produto = i.values[0]

            let channelt = await interaction.guild.channels.create(`🛒 - ${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                parent: '968921775914225674',
                permissionOverwrites : [
                    {
                        id : interaction.user.id,
                        allow : ['VIEW_CHANNEL']
                    },
                    {
                        id : '968570313027780638',
                        deny : ['VIEW_CHANNEL']
                    },
                ]
            })
            interaction.editReply({ content: `${interaction.user} seu pedido foi criado em ${channelt}`, embeds: [],
            components: [], ephemeral: true})

            let embed = new MessageEmbed()
            .setTitle(`Novo pedido`)
            .setColor('GREEN')
            .setImage('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126330014br.gov.bcb.pix0111175471747015204000053039865802BR5925Marcos%20Machado%20Guimaraes%206009Sao%20Paulo62070503***63047C20')
            .setDescription(`**__item:__** \`${produto}\`\n**__usuário:__**\`${interaction.user.username}\`|\`${interaction.user.id}\``)

            channelt.send({ 
                embeds: [embed],
                content: `${interaction.user}`
            })
    
            } else return;
        })

       // collector.on('end', (collected, reason) => {
       //     if (reason === 'time') interaction.editReply({ content: 'O tempo para informar o canal se esgotou!', components: [] })
      //  })
    }
}