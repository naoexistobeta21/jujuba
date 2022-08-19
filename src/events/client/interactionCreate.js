const Event = require('../../structures/Event')
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const data = require('../../database/Schemas/User')
const Guild = require('../../database/Schemas/Guild')

const coins = require('discord-mongo-currency')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if(interaction.isButton()) {
            if(interaction.customId === 'playAdv') {
                let c = await coins.findUser(interaction.user.id, '968570313027780638')
                if(c.coinsInWallet >= 2000) {
                    const embed = new MessageEmbed().setTitle('Mochila de porções').setDescription(`> Veneno\n> Explosão de Tinta\n> Laxante\n> Aleatório`).setColor('RED')
                    const veneno = new MessageButton().setLabel('Usar veneno').setStyle('PRIMARY').setCustomId('veneninhobb')
                    interaction.reply({ embeds: [embed], ephemeral: true})
                    this.client.adv.addPlayer(interaction, interaction.user.id)
                } else {
                    interaction.reply({ content: 'Você precisa de pelo menos 2,000 caramelos para entrar!', ephemeral: true})
                }
            }
        }
        if (interaction.isCommand()) {
            if(this.client.user.id === '960344090241798155' && interaction.channel.id !== '977363339728531457') return interaction.reply({ content: `\🤖 | *Meus comandos só pedem ser utilizados no chat:* <#977363339728531457>`, ephemeral: true})
            if (!interaction.guild) return;

            const guilda = await Guild.findOne({ 
                server: interaction.guild.id
            })

            let user = await data.findOne({
                user: interaction.user.id
            });
            
            if(!guilda) {
                    let novo = new Guild({
                        server: interaction.guild.id
                    })
    
                    novo.save()
    
                    interaction.reply({ content: '*Servidor cadastrado na minha database, use o comando novamente!*', ephemeral: true})
                } else
            if(!user) {
                let hu = new data({
                    user: interaction.user.id,
                })

                hu.save()
                interaction.reply({ content: 'Você foi registrado na minha database, use o comando novamente!', ephemeral: true})
           
            } else {
                this.t = await this.client.getTranslate(interaction.guild.id)
                const cmd = this.client.commands.find(c => c.name === interaction.commandName)

                if (cmd) {
                if(user.status.blacklist.status === true) return interaction.reply({ content: 'Você está banido!', ephemeral: true}) 
                    
                    try {
                  cmd.run(interaction, this.t)
                        } catch (err) {
                            interaction.reply({ content: `Olá, aconteceu algum erro ao executar o comando,\n\`\`\`\n${err}\`\`\``})
                            }
                    console.log(`User: ${interaction.user.tag} (${interaction.user.id}) guild: ${interaction.guild.name} (${interaction.guild.id}) Comando: ${cmd.name}`)
                        
                            }
            }
            

                
                            
        }
    }
}