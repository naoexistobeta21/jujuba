const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'background',
            description: '[✨ PROFILE ] Compre backgrounds para seu perfil!'
        })
    }

    run = async (interaction) => {
        const coins = await bitcoin.findUser(interaction.user.id, '968570313027780638')
        const data = await User.findOne({ IdU: interaction.user.id })
        let contagem = 1
        
        let button1 = new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('◀️')
                .setCustomId('REMOVER')
                .setDisabled(true)
        
            let button2 = new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('▶️')
                .setCustomId('ADICIONAR')
            
            let button3 = new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('COMPRAR')
                .setCustomId('buy')
            
          if(coins.coinsInWallet < 1000000) { button3.setDisabled(true)}
        

        const actionRow = new MessageActionRow().addComponents(button1, button2, button3)
        
        let embed = new MessageEmbed()
        .setTitle('🖼️ Loja de backgrounds')
        .setDescription(`**__ID:__** \`1\`\n**__PREÇO:__** \`1,000,000\`\n*Caso o botão de comprar esteja desativado, significa que você não tem bitcoins suficiente.*`)
        .setImage('https://media.discordapp.net/attachments/967120262510297141/971982945957060658/back_01.jpg?width=1043&height=587')
        .setColor('GREEN')

        const reply = await interaction.reply({
            content: `teste`,
            embeds: [embed],
            components: [actionRow],
            fetchReply: true
        })

        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: (2 * 60000) })

        collector.on('collect', async (i) => {
            switch (i.customId) {
                case 'REMOVER':
                    contagem--
                    break;
                case 'ADICIONAR':
                    contagem++
                    break;
            }
            
            if(i.customId === 'buy') {
                if(contagem === 1) {
                    bitcoin.deductCoins(interaction.user.id, '968570313027780638', 1000000)
                    let test1 = await User.findOneAndUpdate({
            IdU: interaction.user.id,
            profile: {
                background: 'https://media.discordapp.net/attachments/967120262510297141/971982945957060658/back_01.jpg?width=1043&height=587',
            }
        })
                  test1.save()
                    i.update({
                        content: '*background comprado, veja ele com* \`/perfil\`',
                        components: [],
                        embeds: []
                    })
                } else if(contagem === 2) {
                    bitcoin.deductCoins(interaction.user.id, '968570313027780638', 20000)
                    let test2 = await User.findOneAndUpdate({
            IdU: interaction.user.id,
            profile: {
                background: 'https://media.discordapp.net/attachments/967120262510297141/971982945680240660/back_02.jpg?width=1043&height=587',
            }
        })
                  test2.save()
                    i.update({
                        content: '*background comprado, veja ele com* \`/perfil\`',
                        components: [],
                        embeds: []
                    })
                } else if(contagem === 3) {
                    bitcoin.deductCoins(interaction.user.id, '968570313027780638', 10000)
                    let test3 = await User.findOneAndUpdate({
            IdU: interaction.user.id,
            profile: {
                background: 'https://media.discordapp.net/attachments/967120262510297141/971982945424400394/back_03.jpg?width=1043&height=587',
            }
        })
                  test3.save()
                    i.update({
                        content: '*background comprado, veja ele com* \`/perfil\`',
                        components: [],
                        embeds: []
                    })
                } else if(contagem === 4) {
                    //https://cdn.discordapp.com/attachments/971569013782118440/973329087554805850/Broken.png
                    bitcoin.deductCoins(interaction.user.id, '968570313027780638', 10000)
                    let test4 = await User.findOneAndUpdate({
            IdU: interaction.user.id,
            profile: {
                background: 'https://media.discordapp.net/attachments/971569013782118440/974035080672583800/broken_heart.png',
            }
        })
                  test4.save()
                    i.update({
                        content: '*background comprado, veja ele com* \`/perfil\`',
                        components: [],
                        embeds: []
                    })
                }
            }
            
            if(contagem === 1) {
                button1.setDisabled(true)
                button2.setDisabled(false)
                if(coins.coinsInWallet < 1000000) { button3.setDisabled(true)} else {button3.setDisabled(false)}
                let embed1 = new MessageEmbed()
        .setTitle('🖼️ Loja de backgrounds')
        .setDescription(`**__ID:__** \`1\`\n**__PREÇO:__** \`1,000,000\`\n*Caso o botão de comprar esteja desativado, significa que você não tem bitcoins suficiente.*`)
        .setImage('https://media.discordapp.net/attachments/967120262510297141/971982945957060658/back_01.jpg?width=1043&height=587')
        .setColor('GREEN')
             i.update({
                content: ` `,
                embeds: [embed1],
                components: [actionRow]
            })
            } else if(contagem === 2) {
                button1.setDisabled(false)
                if(coins.coinsInWallet < 20000) { button3.setDisabled(true)} else {button3.setDisabled(false)}
                let embed2 = new MessageEmbed()
        .setTitle('🖼️ Loja de backgrounds')
        .setDescription(`**__ID:__** \`2\`\n**__PREÇO:__** \`20,000\`\n*Caso o botão de comprar esteja desativado, significa que você não tem bitcoins suficiente.*`)
        .setImage('https://media.discordapp.net/attachments/967120262510297141/971982945680240660/back_02.jpg?width=1043&height=587')
        .setColor('GREEN')
             i.update({
                content: ` `,
                embeds: [embed2],
                components: [actionRow]
            })
            } else if(contagem === 3) {
                button1.setDisabled(false)
                if(coins.coinsInWallet < 10000) { button3.setDisabled(true)} else {button3.setDisabled(false)}
              let embed3 = new MessageEmbed()
        .setTitle('🖼️ Loja de backgrounds')
        .setDescription(`**__ID:__** \`3\`\n**__PREÇO:__** \`10,000\`\n*Caso o botão de comprar esteja desativado, significa que você não tem bitcoins suficiente.*`)
        .setImage('https://media.discordapp.net/attachments/967120262510297141/971982945424400394/back_03.jpg?width=1043&height=587')
        .setColor('GREEN')
             i.update({
                content: ` `,
                embeds: [embed3],
                 components: [actionRow]
            })
            } else if(contagem === 4) {
                button1.setDisabled(false)
                if(coins.coinsInWallet < 10000) { button3.setDisabled(true)} else {button3.setDisabled(false)}
                button2.setDisabled(true)
              let embed3 = new MessageEmbed()
        .setTitle('🖼️ Loja de backgrounds')
        .setDescription(`**__ID:__** \`4\`\n**__PREÇO:__** \`10,000\`\n*Caso o botão de comprar esteja desativado, significa que você não tem bitcoins suficiente.*`)
        .setImage('https://media.discordapp.net/attachments/971569013782118440/974035080672583800/broken_heart.png')
        .setColor('GREEN')
             i.update({
                content: ` `,
                embeds: [embed3],
                 components: [actionRow]
            })
            } 
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({
                content: `*O tempo para você escolher um background acabou!*`,
                components: [],
                embeds: []
            })
        })
    }
}