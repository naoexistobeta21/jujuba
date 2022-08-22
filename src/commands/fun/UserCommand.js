
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            description: 'user, simples',
            options: [
                {
                    
                            type: 'SUB_COMMAND',
                            name: 'avatar',
                            description: '[ 👤 USER ] Veja o avatar do usuário',
                            options: [
                                {
                                    type: 'USER',
                                    name: 'user',
                                    description: 'Usuário que você quer ver o avatar',
                                    required: false
                                }
                            ]
                },
        {
                    
            type: 'SUB_COMMAND',
            name: 'info',
            description: '[ 👤 USER ] Veja as informações de um usuário.',
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'Qual usuário que você quer ver as informações?',
                    required: false
                }
            ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'ship',
    description: '[ 👤 USER ] Shippar usuários é minha paixão!',
    options: [
        {
            type: 'USER',
            name: 'user1',
            description: '1 Qual usuário que você quer shipar?',
            required: true
        },
        {
            type: 'USER',
            name: 'user2',
            description: '2 Qual usuário que você quer shipar?',
            required: false
        }
    ]
}
                
            ]
        })
    }

    run = (interaction) => {
        const subCommand = interaction.options.getSubcommand()
        const user = interaction.options.getUser('user') || interaction.user

        require(`../../subCommands/user/${subCommand}`)(this.client, interaction, user)
    }
}