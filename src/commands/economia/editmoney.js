//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/transactions')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'edit_money',
            description: 'Apenas minha equipe pode usar isso.',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que você vai editar',
                    required: true
        },
                {
                            type: 'STRING',
                            name: 'valor',
                            description: 'quantidade de money a ser editado',
                            required: true
                }
            ]
        })
    }

    run = async (interaction) => {
    interaction.channel.sendTyping()
    if(interaction.user.id === '947856944515936306') {
        
        
    const user = interaction.options.getUser('usuário')
    const value = interaction.options.getString('valor')
    if(isNaN(value)) return interaction.reply({ content: '*Digite um numero válido. exemplo: 1000000*', ephemeral: true})

    const coinsV = await bitcoin.findUser(user.id, '968570313027780638')

    const yes = new MessageButton()
    .setCustomId('add')
    .setLabel('ADICIONAR')
    .setStyle('SUCCESS')

    const no = new MessageButton()
    .setCustomId('remove')
    .setLabel('REMOVER')
    .setStyle('DANGER')


    const row = new MessageActionRow().addComponents(yes, no)


    interaction.reply({
    content: `*Escolha uma opção`,
    components: [row],
    ephemeral: true
    })
         
    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'add') {
      
    bitcoin.giveCoins(user.id, '968570313027780638', value)
    const embedadd = new MessageEmbed()
    .setTitle('Relatório de editmoney')
    .setColor('GREEN')
    .setDescription(`*O Admin ${interaction.user.tag} adicionou* **${Utils.toAbbrev(value)}** *caramelos na sua carteira*`)

    const TransNew = new User({
        user: user.id,
        transaction: `<:add:977391516412698705> Um admin adicionou - ${Utils.toAbbrev(value)} (${value})`
    })
    TransNew.save()

    try{
        user.send({
        embeds: [embedadd]
    })
    } catch(err) {
        return console.log('F')
    }

    await i.update({ content: `concluído`, components: [] }); //968570313027780638
	} else if(i.customId === 'remove') {
     if(value > coinsV.coinsInWallet) {
         bitcoin.deductCoins(user.id, '968570313027780638', coinsV.coinsInWallet)
     } else {
         bitcoin.deductCoins(user.id, '968570313027780638', value)
     }
    const embedremove = new MessageEmbed()
    .setTitle('Relatório de editmoney')
    .setColor('RED')
    .setDescription(`*O Admin ${interaction.user.tag} removeu* **${Utils.toAbbrev(value)}** *bitcoins da sua carteira*`)
    
    const TransNew = new User({
        user: user.id,
        transaction: `<:remove:977391516274290699> Um admin removeu - ${Utils.toAbbrev(value)} (${value})`
    })
    TransNew.save()

    try{
        user.send({
        embeds: [embedremove]
    })
    } catch (err) {
        return console.log('F')
    }

    await i.update({ content: `concluído`, components: [] });
    }
});

collector.on('end', collected => {});
    } else return interaction.reply({ content: '*Você não pode user esse comando bobinho!*', ephemeral: true})
    
    
     }
    
}