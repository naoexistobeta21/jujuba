//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Trans = require('../../database/Schemas/transactions')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            description: 'Faça pagamentos usando este comando.',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'usuário que você vai pagar',
                    required: true
        },
                {
                            type: 'STRING',
                            name: 'valor',
                            description: 'valor do pagamento',
                            required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
    
    const user = interaction.options.getUser('usuário')
    const value = interaction.options.getString('valor')
    
    if(isNaN(value)) return interaction.reply({ content: '*Digite um numero válido, exemplo: 1000000*'})

    const coinsV = await bitcoin.findUser(user.id, '968570313027780638')
    const coinsU = await bitcoin.findUser(interaction.user.id, '968570313027780638')
    const transV = await Trans.findOne({
        user: interaction.user.id
    })
    const transU = await Trans.findOne({
        user: user.id
    })
    if(user.id === interaction.user.id) return interaction.reply({ content: '*Impossivel enviar bitcoins para se mesmo*', ephemeral: true })
        
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
             content: `${interaction.user}, *para enviar* **${Utils.toAbbrev(value)}** *pro usuário* ${user} *clique no botão* \✅\n\`AVISO: A Equipe do Glow bot não devolve bitcoins depois que é aceito a transação. Também não nos responsabilizamos pelos atos dos usuários envolvidos na transação.\``,
             components: [row]
         })
         interaction.channel.sendTyping()
         
         const filter = i => i.user.id === interaction.user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
    bitcoin.giveCoins(user.id, '968570313027780638', value)
    bitcoin.deductCoins(interaction.user.id, '968570313027780638', value)
    if(transV) {
        let arrayTwo = transV.transactions
        arrayTwo.push(`\`💸 Enviou ${value} caramelos para ${user.tag}\``)
        await Trans.findOneAndUpdate({
            user: interaction.user.id,
            trasactions: arrayTwo
        })
    }
    
    i.update({ content: `${interaction.user} *enviou* **${Utils.toAbbrev(value)} (\`${value}\`)** *para* ${user}`, components: [] }); //968570313027780638
	} else if(i.customId === 'cancel') {
        await i.update({ content: '*transação cancelada pelo author*', components: []})
    }
});

collector.on('end', collected => {});
     }
    }
}