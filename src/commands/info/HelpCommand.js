//https://server-shay444ofc.vercel.app/api/data/

const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')
const bot = require('../../../index')
const axios = require('axios')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: '[ ❓ INFO ] - Veja todos os meus comandos!',
            options: [
                {
                    type: 'STRING',
                    name: 'command',
                    description: 'Escolha um comando especifico.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        let command = interaction.options.getString('command')
        
        if(!command) {
            let cmds = ` `
            this.client.commands.forEach((cmd => {
                let subcommands = {}
                if(cmd.options) {
                    let sub = cmd.options.filter(c => c.type === 'SUB_COMMAND')
                    if(sub) {
                        let s = sub.map(a => a.name)
                        subcommands[cmd.name] = `${s}`
                    } else {
                        subcommands[cmd.name] = `Sem sub comandos`
                    }
                }

                cmds += `**${cmd.name}**\n\`${subcommands[cmd.name] ? subcommands[cmd.name] : 'Sem sub comandos'}\`\n`
                
            }))

            let embed = new MessageEmbed()
            .setTitle('Comandos')
            .setDescription(`${cmds}`)
            .setColor('DARK_VIVID_PINK')
            .setFooter({ text: 'Para usar eles basta escrever: /comando [subcomando] [options]'})

            interaction.reply({ embeds: [embed]})
        } else {
            let cmd = bot.client.commands.filter(c => c.name === command)
            console.log(cmd[0])
            let subcommands = `Sem sub comandos`
            if(cmd[0].options) {
                let sub = cmd[0].options.filter(c => c.type === 'SUB_COMMAND')
            if(sub) {
                let s = sub.map(a => a.name)
                subcommands = `${s}`
            } else {
                subcommands = `Sem sub comandos`
            }
            }

            let embed = new MessageEmbed()
            .setTitle(`${cmd[0].name}`)
            .setDescription(`\`${cmd[0].description}\``)
            .setColor('DARK_VIVID_PINK')
            .setFields({
                name: 'Sub commandos',
                value: `\`${subcommands ? subcommands : 'Sem sub comandos'}\``
            })
            .setFooter({ text: 'Para usar basta escrever: /comando [subcomando] [options]'})

            interaction.reply({ embeds: [embed]})
        }
    }
}
