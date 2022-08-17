//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Trans = require('../../database/Schemas/transactions')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = async (client, interaction, t) => {
       // interaction.channel.sendTyping()
    
    const user = interaction.options.getUser('usuário')
    const value = interaction.options.getNumber('valor')
    
    

    const coinsV = await bitcoin.findUser(user.id, '968570313027780638')
    const coinsU = await bitcoin.findUser(interaction.user.id, '968570313027780638')
    if(user.id === interaction.user.id) return interaction.reply({ content: '*Impossivel enviar caramelos para si mesmo*', ephemeral: true })
        
     if(coinsU.coinsInWallet < value) {
         interaction.reply(`**Impossivel fazer um pix falso, vai trabalhar seu pobre!**`)
     } else {
        const button = new MessageButton()
        .setCustomId('primary')
        .setEmoji('✅')
        .setStyle('PRIMARY')
        const button2 = new MessageButton()
        .setCustomId('cancel')
        .setLabel('Cancelar')
        .setStyle('DANGER')

        const row = new MessageActionRow().addComponents(button, button2)
         interaction.reply({
             content: `${interaction.user}, *para enviar* **${Utils.toAbbrev(value)}** *pro usuário* ${user} *clique no botão* \✅\n\`AVISO: A Equipe da jujuba não devolve caramelos depois que é aceito a transação. Também não nos responsabilizamos pelos atos dos usuários envolvidos na transação.\``,
             components: [row]
         })
         
         const filter = i => i.user.id === interaction.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
    bitcoin.giveCoins(user.id, '968570313027780638', value)
    bitcoin.deductCoins(interaction.user.id, '968570313027780638', value)

    const usuarioT = new Trans({
        user: user.id,
        transaction: `<:add:977391516412698705> Recebeu ${Utils.toAbbrev(value)} (${value}) de ${interaction.user.tag}`
    })

    const usuarioR = new Trans({
        user: interaction.user.id,
        transaction: `<:remove:977391516274290699> Enviou ${Utils.toAbbrev(value)} (${value}) para ${user.tag}`
    })

    usuarioR.save()
    usuarioT.save()
    
    i.update({ content: `${interaction.user} *enviou* **${Utils.toAbbrev(value)} (\`${value}\`)** *para* ${user}`, components: [] }); //968570313027780638
	} else if(i.customId === 'cancel') {
        await i.update({ content: '*transação cancelada pelo author*', components: []})
    }
});

collector.on('end', collected => {});
     }
    }
