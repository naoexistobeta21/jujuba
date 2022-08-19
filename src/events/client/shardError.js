const Event = require('../../structures/Event')
const Discord = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'shardError'
        })
    }

    run = async (error, id) => {
        const web = new Discord.WebhookClient({ id: '986859916302098432', token: 'pTktWHh9T7hwdOxtxmMr_i7nYCizIFojtWui1s4-ThJ049sJP10iQIPGdim9v1l_XeVP'})

        let embed = new Discord.MessageEmbed()
        .setDescription(`A Shard \`${id + 1}\` caiu por conta de um erro\n \`\`\`js\n${error}\n\`\`\``)
        web.send({ embeds: [embed]})
    }
}