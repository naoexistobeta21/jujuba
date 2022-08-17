//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/User')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = async (client, interaction, t) => {   
    const user = interaction.options.getUser('usuário')
    const value = interaction.options.getNumber('valor')
    
    
    const coinsV = await bitcoin.findUser(user.id, '968570313027780638')
    const coinsU = await bitcoin.findUser(interaction.user.id, '968570313027780638')
    const usuar = await User.findOne({
        user: interaction.user.id
    })
    
     if(value > coinsV.coinsInWallet ) return interaction.reply(`*Usuário não tem caramelos suficientes*`)
     if(user.id === interaction.user.id) return interaction.reply(`**Safadinho, tentado realizar um bug né?**`)
     if(value > coinsU.coinsInWallet) return interaction.reply(`*Você não tem caramelos suficientes*`)

     if(user.id === '970134090152034354') {
        if(usuar.status.premium.status === true) {
           let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];
            if(resposta === 'cara') {
            bitcoin.giveCoins(interaction.user.id, '968570313027780638', value)
            bitcoin.deductCoins(user.id, '968570313027780638', value)
            await interaction.reply({ content: `${interaction.user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value))}** *financiado por* ${user}`, components: [] }); //968570313027780638
        } else
            if(resposta === 'coroa') {
            bitcoin.deductCoins(interaction.user.id, '968570313027780638', value)
            bitcoin.giveCoins(user.id, '968570313027780638', value)
            await interaction.reply({ content: `${user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value))}** *financiado por* ${interaction.user}`, components: [] });
        }
        }
         if(usuar.Premium === 'off') {
            let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];
            if(resposta === 'cara') {
            bitcoin.giveCoins(interaction.user.id, '968570313027780638', value - value/100 * 3)
            bitcoin.deductCoins(user.id, '968570313027780638', value - value/100 * 3)
            await interaction.reply({ content: `${interaction.user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value - value/100 * 3))}** *financiado por* ${user}`, components: [] }); //968570313027780638
        } else if(resposta === 'coroa') {
            bitcoin.deductCoins(interaction.user.id, '968570313027780638', value - value/100 * 3)
            bitcoin.giveCoins(user.id, '968570313027780638', value - value/100 * 3)
            await interaction.reply({ content: `${user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value - value/100 * 3))}** *financiado por* ${interaction.user}`, components: [] });
        }
        }
       } else {
             const button = new MessageButton()
        .setCustomId('primary')
        .setEmoji('✅')
        .setStyle('PRIMARY')

        const row = new MessageActionRow().addComponents(button)


         if(usuar.status.premium.status === true) {
             interaction.reply({
             content: `${user}, ${interaction.user} *quer apostar com você valendo* **${Utils.toAbbrev(value)}**, *quem ganhar leva* **${Utils.toAbbrev(Math.floor(value))}**\n*para aceitar essa transação clique no botão* \✅`,
             components: [row]
         })
         } else {
             interaction.reply({
             content: `${user}, ${interaction.user} *quer apostar com você valendo* **${Utils.toAbbrev(value)}**, *quem ganhar leva* **${Utils.toAbbrev(Math.floor(value - value/100 * 3))}** *(${Math.floor(value/100 * 3)} de taxa)*\n*para aceitar essa transação clique no botão* \✅`,
             components: [row]
         })
         }
         
         const filter = i => i.customId === 'primary' && i.user.id === user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
        if(usuar.status.premium.status === true) {
            let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];
            if(resposta === 'cara') {
            i.update({ components: [] })
            bitcoin.giveCoins(interaction.user.id, '968570313027780638', value)
            bitcoin.deductCoins(user.id, '968570313027780638', value)
            await interaction.channel.send({ content: `${interaction.user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value))}** *financiado por* ${user}`, components: [] })
        } else if(resposta === 'coroa') {
            i.update({ components: [] })
            let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];
            bitcoin.deductCoins(interaction.user.id, '968570313027780638', value)
            bitcoin.giveCoins(user.id, '968570313027780638', value)
            await interaction.channel.send({ content: `${user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value))}** *financiado por* ${interaction.user}`, components: [] })
        }
        } else {
            let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];
            if(resposta === 'cara') {
            i.update({ components: [] })
            bitcoin.giveCoins(interaction.user.id, '968570313027780638', value - value/100 * 3)
            bitcoin.deductCoins(user.id, '968570313027780638', value - value/100 * 3)
            await interaction.channel.send({ content: `${interaction.user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value - value/100 * 3))}** *financiado por* ${user}`, components: [] })

        }
        if(resposta === 'coroa') {
            i.update({ components: [] })
            bitcoin.deductCoins(interaction.user.id, '968570313027780638', value - value/100 * 3)
            bitcoin.giveCoins(user.id, '968570313027780638', value - value/100 * 3)
            await interaction.channel.send({ content: `${user}, *Você ganhou* **${Utils.toAbbrev(Math.floor(value - value/100 * 3))}** *financiado por* ${interaction.user}`, components: [] })
        }
        }
	}
});

collector.on('end', async (collected, reason) => {
});
       }
     }
    
