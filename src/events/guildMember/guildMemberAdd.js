const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) => {

        //this.client.channels.cache.get('968514495288868917').send('Welcome!\nhttps://discord.gg/hZ9ukmPPe5 \nhttps://discord.com/api/oauth2/authorize?client_id=970134090152034354&permissions=8&scope=bot%20applications.commands')
        /*const guildDB = await this.client.db.guilds.findById(member.guild.id)

        if (guildDB?.welcome) {
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)

            welcomeChannel?.send(`${member.toString()}, seja bem vindo ao nosso servidor!`)
        }*/
    }
}