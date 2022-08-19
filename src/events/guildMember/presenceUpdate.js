const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'presenceUpdate'
        })
    }

    run = async (oldPresence, newPresence) => {
        let link = 'discord.gg/8BbdxF7CZX' //presence
        let guildId = '968570313027780638' //id do servidor
        let roleId = "1001527756946939954" //id do cargo
        if(newPresence.guild.id === `${guildId}`) {
        let role = newPresence.guild.roles.cache.get(roleId)
        let status = newPresence.activities[0]?.state === `${link}` ? true : false

        if(status) {
            newPresence.member.roles.add(role.id) 
        } else {
            newPresence.member.roles.remove(role.id) 
        }
        }
    }
}