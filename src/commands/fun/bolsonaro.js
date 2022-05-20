const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas')
const Command = require('../../structures/Command')


const { registerFont } = require('canvas')
registerFont('helsinki.ttf', { family: 'helsinki' })
registerFont('IndieFlower-Regular.ttf', { family: 'indieFlower-Regular'}) //Segoe UI Black
registerFont('Segoe UI Black.ttf', { family: 'Segoe UI Black'})

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'bolsonaro',
            description: '[ 😂 DIVERSAO ] bolsonaro tv.',
            options: [
                {
                    type: 'STRING',
                    name: 'texto',
                    description: 'um textinho para aparecer na tv.',
                    required: false
        },
                {
                    type: 'USER',
                    name: 'usuário',
                    description: 'um usuário para aparecer na tv.',
                    required: false
        }
            ]
        })
    }

    run = async (interaction) => {
        
        const button = new Discord.MessageButton()
        .setCustomId('bolsominion')
        .setLabel(`Enviado por: ${interaction.user.username}`)
        .setStyle('SECONDARY')
        .setDisabled(true)

        const row = new Discord.MessageActionRow().addComponents(button)
        
        try {
            try{
                let user = interaction.options.getUser('usuário')
                let target;
                if(!user) {
                    target = 'https://cdn.discordapp.com/attachments/885942897797652480/906255820839342181/unknown.png'
                } else {
                    target = user;
                }
    

                if(target === user) {
                const canvas = Canvas.createCanvas(1667, 958)
                const ctx = canvas.getContext("2d")
    
                
                let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

                const TargetAvatar = await Canvas.loadImage(`${avatar}`)
                ctx.drawImage(TargetAvatar, 455, 1, 1200, 1200)
                
                let layout = await 
                Canvas.loadImage("https://cdn.discordapp.com/attachments/885942897797652480/906254799182381156/bolsonaro.png")
                ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `bolsonaro_${interaction.user.id}_.png`)
                return interaction.reply({ content: `:pencil: | ${interaction.user}`, files: [attachment], components: [row]})
                } else {
                    if(verificar(interaction.options.getString('texto'))) {
                    const canvas = Canvas.createCanvas(1667, 958)
                    const ctx = canvas.getContext("2d")
        
                    
                    let avatar = interaction.options.getString('texto')
    
                    const TargetAvatar = await Canvas.loadImage(`${avatar}`)
                    ctx.drawImage(TargetAvatar, 455, 1, 1200, 1200)
                    
                    let layout = await 
                    Canvas.loadImage("https://cdn.discordapp.com/attachments/885942897797652480/906254799182381156/bolsonaro.png")
                    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)
    
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `bolsonaro_${interaction.user.id}_.png`)
                    return interaction.reply({ content: ` `, files: [attachment] })
                    } else if(interaction.options.getString('texto')) {
                    const canvas = Canvas.createCanvas(1667, 958)
                    const ctx = canvas.getContext("2d")
                    
                    let layout = await 
                    Canvas.loadImage("https://cdn.discordapp.com/attachments/885942897797652480/906263068919599104/bolsonaro_461346834342739978_.png")
                    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

                    ctx.font = `90px "Segoe UI Black"`;
                    ctx.fillStyle = '#000000';
                    ctx.fillText(shorten(`${interaction.options.getString('texto')}`, 22), 500, 400)
    
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `bolsonaro_${interaction.user.id}_.png`)
                    return interaction.reply({ content: `:pencil: | ${interaction.user}`, files: [attachment], components: [row] })
                    } else {
                         const canvas = Canvas.createCanvas(1667, 958)
                    const ctx = canvas.getContext("2d")
                    
                    let layout = await 
                    Canvas.loadImage("https://cdn.discordapp.com/attachments/885942897797652480/906263068919599104/bolsonaro_461346834342739978_.png")
                    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

                    ctx.font = `90px "Segoe UI Black"`;
                    ctx.fillStyle = '#000000';
                    ctx.fillText(shorten(`Cadê o texto daqui?`, 22), 500, 400)
    
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `bolsonaro_${interaction.user.id}_.png`)
                    console.log(attachment)
                    return interaction.reply({ content: `:pencil: | ${interaction.user}`, files: [attachment], components: [row] })
                    }
                }
                
            } catch (err) {
                console.log(err)
                interaction.reply('erro no script.')
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}

function shorten(text, len) {
    if (typeof text !== "string") return "";
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "\n";
  }


  function verificar(string) {
    let link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  
    if (link.test(string)) return true;
    return false;
  }