const Discord = require("discord.js")
const { Permissions } = require('discord.js')
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const Guild = require('../../database/Schemas/Guild')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const { AuditLOG } = require('../../../packages/Webhook')
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: '[ ⚙️ MOD ] Expulsar algum usuário?',
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'Qual usuário deseja expulsar?',
                    required: true
                },
                {
                    type: 'STRING',
                    name: 'motive',
                    description: 'Qual é o motivo?',
                    required: false
                }
            ],
        }
       
        )
    }

    run = async (interaction) => {
        if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ content: 'Você não pode expulsar ninguém...', ephemeral: true})
        const user = interaction.options.getMember('user')
        console.log(user)
        const motive = interaction.options.getString('motive') || 'Nenhum motivo inserido'
        if(user.id === interaction.user.id) return interaction.reply({ content: 'Você não pode expulsar você mesmo bobinho!', ephemeral: true})
        if (user.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: 'Você não pode expulsar membros com cargos maior que o seu!', ephemeral: true})
        if (interaction.guild.me.roles.highest.position <= user.roles.highest.position) return interaction.reply({ content: 'Eu não consigo expulsar este membro, meu cargo não é tão superior quanto o dele.', ephemeral: true })

        const guild = await Guild.findOne({ server: interaction.guild.id})
        //button
        const button = new Discord.MessageButton().setStyle('PRIMARY').setLabel('Confirmar punição').setCustomId('confirm')
        const row = new Discord.MessageActionRow().addComponents(button)
        let msg = await interaction.reply({ content: `<:bmo_howdy:1000167902126805042> | Você está prestes a expulsar ${user} do seu servidor pelo motivo **${motive}**!`, components: [row], fetchReply: true})

        const filter = user => user
        const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000})

        collector.on('collect', async (i) => {
            if(i.user !== interaction.user) return i.reply({ content: 'Você não pode usar isto, saia daqui!', ephemeral: true})
            await user.kick({ reason: motive})
            i.update({ content: 'Usuário punido com sucesso, quem manda quebrar as regras!', components: []})
            
            const log = new AuditLOG(guild, this.client, interaction.guild)
            log.send({title: 'Membro expulso', description: `**__Nome:__** ${user.username} (${user.id})\n**__Staff:__** ${interaction.user.username} (${interaction.user.tag})\n**__Motivo:__** ${motive}`, color: 'RED'})
        })
        
    }
}