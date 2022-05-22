const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'roleplay',
            description: 'Roleplay , simples',
            options: [
                {
                    
                            type: 'SUB_COMMAND',
                            name: 'kiss',
                            description: '[ 😂 DIVERSAO ] Beije seu crush ou roube um beijo.',
                            options: [
                                {
                                    type: 'USER',
                                    name: 'usuário',
                                    description: 'Usuário que você vai beijar.',
                                    required: true
                                }
                            ]
                },
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'dance',
                    description: '[ 😂 DIVERSAO ] Arrase no baile com usuários!',
                    options: [
                        {
                            type: 'USER',
                            name: 'usuário',
                            description: 'Usuário que você vai dançar.',
                            required: true
                        }
                    ]
        },
        {
                    
            type: 'SUB_COMMAND',
            name: 'hug',
            description: '[ 😂 DIVERSAO ] Abrace um usuário que está carente.',
            options: [
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'Usuário que você vai abraçar.',
                    required: true
                }
            ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'slap',
    description: '[ 😂 DIVERSAO ] Dê tapa em um usuário.',
    options: [
        {
            type: 'USER',
            name: 'usuário',
            description: 'Usuário que você vai bater.',
            required: true
        }
    ]
}
            ]
        })
    }

    run = (interaction) => {
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/roleplay/${subCommand}`)(this.client, interaction)
    }
}