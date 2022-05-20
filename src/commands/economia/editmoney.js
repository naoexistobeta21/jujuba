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
    if(isNaN(value)) return interaction.reply({ content: '*Digite um numero válido. exemplo: 1000000*'})

    const coinsV = await bitcoin.findUser(user.id, '968570313027780638')
    const trans = await User.findOne({
        user: user.id
    })
    
    const yes = new MessageButton()
    .setCustomId('add')
    .setLabel('ADICIONAR')
    .setStyle('SUCCESS')

    const no = new MessageButton()
    .setCustomId('remove')
    .setLabel('REMOVER')
    .setStyle('DANGER')
    
    const transButton = new MessageButton()
    .setCustomId('new')
    .setLabel('NEW PROFILE')
    .setStyle('PRIMARY')
    
    if(trans) {
        transButton.setDisabled(true)
    } else {
        transButton.setDisabled(false)
    }

    const row = new MessageActionRow().addComponents(yes, no, transButton)


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
    
    const embedadd2 = new MessageEmbed()
    .setTitle('Relatório de editmoney')
    .setColor('GREEN')
    .setDescription(`*O Admin ${interaction.user.tag} adicionou* **${Utils.toAbbrev(value)}** *caramelos na  carteira de* ${user.tag}`)
    
    let array = []
    
    for(let i;i < 999;i++) {
        if(trans.trasactions[i]) {
            array.push(trans.trasactions[i])
        }
    }
        
    array.push(`\`🛡️ ${interaction.user.tag} adicionou ${value} caramelos\``)
    await User.findOneAndUpdate({
        user: user.id,
        transactions: array 
    })

    try{
        user.send({
        embeds: [embedadd]
    })
    } catch(err) {
        this.client.channels.cache.get('970481305504608256').send({
            embeds: [embedadd2]
        })
    }

    await i.update({ content: `concluído`, components: [] }); //968570313027780638
	} else if(i.customId === 'remove') {
     if(value > coinsV) {
         bitcoin.deductCoins(user.id, '968570313027780638', coinsV)
     } else {
         bitcoin.deductCoins(user.id, '968570313027780638', value)
     }
    const embedremove = new MessageEmbed()
    .setTitle('Relatório de editmoney')
    .setColor('RED')
    .setDescription(`*O Admin ${interaction.user.tag} removeu* **${Utils.toAbbrev(value)}** *bitcoins da sua carteira*`)
    
    const embedremove2 = new MessageEmbed()
    .setTitle('Relatório de editmoney')
    .setColor('RED')
    .setDescription(`*O Admin ${interaction.user.tag} removeu* **${Utils.toAbbrev(value)}** *bitcoins da carteira de* ${user.tag}`)

    try{
        user.send({
        embeds: [embedremove]
    })
    } catch (err) {
        this.client.channels.cache.get('970481305504608256').send({
            embeds: [embedremove2]
        })
    }

    await i.update({ content: `concluído`, components: [] });
    } else if(i.customId === 'new') {
        let date = new Date()
        let array = [
            `\`💸 ${interaction.user.tag} criou o perfil de ${user.tag} em ${moment(date).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``
        ]
        const TransNew = new User({
            user: user.id,
            transactions: array
        })
        TransNew.save()
    await i.update({ content: '*Perfil de usuário criado*', components: []})
    }
});

collector.on('end', collected => {});
    } else return interaction.reply({ content: '*Você não pode user esse comando bobinho!*', ephemeral: true})
    
    
     }
    
}