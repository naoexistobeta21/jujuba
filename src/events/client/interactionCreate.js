const Event = require('../../structures/Event')
const ticketCategories = require('../../util/ticketCategories')
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const data = require('../../database/Schemas/User')
const manu = require('../../database/Schemas/Clients')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return

            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) {
                if (cmd.requireDatabase) {
                    interaction.guild.db =
                        await this.client.db.guilds.findById(interaction.guild.id) ||
                        new this.client.db.guilds({ _id: interaction.guild.id })
                }

                let user = await data.findOne({
                    IdU: interaction.user.id
                });
                
                    let sex = await manu.findOne({
                        client: this.client.user.id
                    })

                if(user) {
                    if(sex) {
                        if(sex.manu === 'true') {
                            if(interaction.user.id !== '947856944515936306') {
                            interaction.reply({ content: `✨ *No momento meus comandos estão em manutenção, tente novamente mais tarde.*`, ephemeral: true})
                        } else {
                            cmd.run(interaction)
                        }
                        } else {
                        if(user.blacklist.status === true) return interaction.reply({ content: 'Você está banido!', ephemeral: true}) 
                        cmd.run(interaction)
                        
                        let content = " "
                        
                        for(let i = 0;i < 10;i++) {
                            if(interaction.options._hoistedOptions[i]) {
                                content += `#${i} [ ${interaction.options._hoistedOptions[i].name} ] - ${interaction.options._hoistedOptions[i].value}\n`
                            }
                        }
                        
                        let canal_commands = this.client.channels.cache.get('975842505788653578')
                        let embed = new MessageEmbed()
                        .setDescription(`**__Usuário:__** *${interaction.user.tag}* | \`${interaction.user.id}\`\n**__Servidor:__** *${interaction.guild.name}* | \`${interaction.guild.id}\`\n**__Comando:__** */${cmd.name}*\n**__Options:__** \n${content}`)
                        .setColor('#FF0000')
                        
                        canal_commands.send({ embeds: [embed]})
                    
                        }
                        
                } else {
                    let manos = new manu({
                            client: this.client.user.id,
                            manu: 'false',
                            reason: 'preguiça'
                        })
                        manos.save()
                        interaction.reply('client registrado com sucesso, use o comando de novo.')
                }
                } else {
                    let hu = new data({
                        IdU: interaction.user.id,
                        IdS: interaction.guild.id,
                        blacklist: {
                            status: false,
                            time: 0,
                            motivo: 'nenhum'
                        },
                        Premium: 'off',
                        daily: 0,
                        work: 0,
                        vip: 0,
                        repTime: 0
                    })
                    hu.save()
                    interaction.reply({ content: 'Você foi registrado na minha database, use o comando novamente!', ephemeral: true})
                    
                    let commandEmbed = new MessageEmbed()
                    .setTitle('Novo na database!')
                    .setDescription(`**__User:__** \`${interaction.user.username}\`|\`${interaction.user.id}\`\n**__Guild:__** \`${interaction.guild.name}\`|\`${interaction.guild.id}\``)
                    .setColor('YELLOW')
                    this.client.channels.cache.get('970481305504608256').send({ embeds: [commandEmbed]})
                }
            }
        } else if (interaction.isButton()) {
            
            if(interaction.customId === 'ligarmanu') {
                if(interaction.user.id !== '947856944515936306') return interaction.reply({ content: 'Você não tem permisão para usar esse botão.', ephemeral: true})
                let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription('Comandos em manutenção')
                
                this.client.channels.cache.get('974585001486221332').send({ embeds: [embed]})
                interaction.reply({ content: 'Comandos adicionados na manutenção', ephemeral: true})
                
                await manu.findOneAndUpdate({
                        client: this.client.user.id,
                   		manu: 'true'
                    })
            } else if(interaction.customId === 'desligarmanu') {
                if(interaction.user.id !== '947856944515936306') return interaction.reply({ content: 'Você não tem permisão para usar esse botão.', ephemeral: true})
                let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription('Comandos voltaram ao normal.')
                
                this.client.channels.cache.get('974585001486221332').send({ embeds: [embed]})
                interaction.reply({ content: 'Comandos removidos da manutenção', ephemeral: true})
                
                await manu.findOneAndUpdate({
                        client: this.client.user.id,
                   		manu: 'false'
                    })
            }
            /*if (interaction.customId.startsWith('openTicket')) {
                const categoryID = interaction.customId.split('-')[1]
                const category = ticketCategories.find(c => c.id === categoryID)

                const channel = await interaction.guild.channels.create(`${category.name}-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    parent: category.id,
                    topic: `ticket-${category.name}-${interaction.user.id}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS']
                        },
                        {
                            id: category.staffRole,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS']
                        }
                    ]
                })

                interaction.reply({ content: `Seu ticket foi aberto com sucesso no canal ${channel.toString()}!`, ephemeral: true })

                const deleteButton = new MessageButton()
                    .setLabel('Fechar ticket')
                    .setEmoji('❌')
                    .setCustomId('closeTicket')
                    .setStyle('DANGER')
                const row = new MessageActionRow().addComponents(deleteButton)

                channel.send({ content: interaction.user.toString(), embeds: [category.embed], components: [row] })
            } else if (interaction.customId === 'closeTicket') {
                interaction.message.edit({
                    content: interaction.message.content,
                    embeds: interaction.message.embeds,
                    components: [
                        new MessageActionRow().addComponents(interaction.message.components[0].components[0].setDisabled())
                    ]
                })

                interaction.reply('O ticket será fechado em 20 segundos.')

                setTimeout(() => interaction.channel.delete(), 20000)
            }
            */
        }
    }
}