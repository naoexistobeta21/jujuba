//https://server-shay444ofc.vercel.app/api/data/

const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'freefire',
            description: '[ ❓ INFO ] - Veja qual é data de criação de sua conta!',
            options: [
                {
                    type: 'NUMBER',
                    name: 'user',
                    description: 'id do jogador',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let user = interaction.options.getNumber('user')
        let t = await getData(`${String(user)}`)

        const embed = new MessageEmbed()
        .setDescription(`A conta foi criada em: \`${t}\``)
        .setColor('DARK_VIVID_PINK')

        const embed2 = new MessageEmbed()
        .setDescription(`Essa conta não existe no freefire!`)
        .setColor('RED')
        
        if(t) {
            interaction.reply({ embeds: [embed]})
        } else {
            interaction.reply({ embeds: [embed2], ephemeral: true})
        }

    }
}

async function getData(userId) {
    let data = await axios.get('https://server-shay444ofc.vercel.app/api/data/' + userId).catch(function(error) {
        return undefined
    })
    if(!data) return undefined
    return data.data.data
}