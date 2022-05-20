const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        })
    }

    run = async (guild) => {
        let guild_verify = await Guild.findOne({
            IdG: guild.id
        });

        if(!guild_verify) {
            let newData = new Guild({
                _id: guild.id,
                IdG: guild.id,
            })
            newData.save();

        }
    }
}