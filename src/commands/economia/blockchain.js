const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const Utils = require("../../util/Util")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const Canvas = require('canvas')
const { registerFont } = require('canvas')
registerFont('helsinki.ttf', { family: 'helsinki' })
registerFont('IndieFlower-Regular.ttf', { family: 'indieFlower-Regular'}) //Segoe UI Black
registerFont('Segoe UI Black.ttf', { family: 'Segoe UI Black'})

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'moneytop',
            description: 'veja os maiores bolsos',
        })
    }

    run = async (interaction) => {
        interaction.channel.sendTyping()
        const leaderboard = await db.generateLeaderboard('968570313027780638', 5);
        console.log(leaderboard)

        if (leaderboard.length < 1) return message.channel.send("blockchain is offline");

        const canvas = Canvas.createCanvas(960, 619)
        const ctx = canvas.getContext("2d")

        let userone = this.client.users.cache.get(leaderboard[0].userId)          
        let avatarone = userone.avatarURL({ dynamic: false, format: "png", size: 1024 });
        
        let usertwo = this.client.users.cache.get(leaderboard[1].userId)          
        let avatartwo = usertwo.avatarURL({ dynamic: false, format: "png", size: 1024 });
        
        let usertres = this.client.users.cache.get(leaderboard[2].userId)          
        let avatartres = usertres.avatarURL({ dynamic: false, format: "png", size: 1024 });
        
        let userfour = this.client.users.cache.get(leaderboard[3].userId)          
        let avatarfour = userfour.avatarURL({ dynamic: false, format: "png", size: 1024 });
        
        const TargetAvatarone = await Canvas.loadImage(`${avatarone}`)
        ctx.drawImage(TargetAvatarone, 194, 97, 120, 120)
        
        const TargetAvatartwo = await Canvas.loadImage(`${avatartwo}`)
        ctx.drawImage(TargetAvatartwo, 194, 225, 120, 120)
        
        const TargetAvatartres = await Canvas.loadImage(`${avatartres}`)
        ctx.drawImage(TargetAvatartres, 194, 360, 120, 120)
        
        const TargetAvatarfour = await Canvas.loadImage(`${avatarfour}`)
        ctx.drawImage(TargetAvatarfour, 194, 475, 120, 120)
    
        let layout = await 
        Canvas.loadImage("https://cdn.discordapp.com/attachments/967464112961499236/970886052598407178/Layout_v2.png")
        ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)
                    
        ctx.textAlign = "left"
        ctx.font = '38px Segoe UI Black';
        ctx.fillStyle = '#FAA302';
        await Utils.renderEmoji(ctx, shorten(`${userone.tag} - ${Utils.toAbbrev(leaderboard[0].coinsInWallet)}`, 50), 315, 180);
        
        ctx.textAlign = "left"
        ctx.font = '38px Segoe UI Black';
        ctx.fillStyle = '#0F0F0F';
        await Utils.renderEmoji(ctx, shorten(`${usertwo.tag} - ${Utils.toAbbrev(leaderboard[1].coinsInWallet)}`, 50), 315, 300);
        
        ctx.textAlign = "left"
        ctx.font = '38px Segoe UI Black';
        ctx.fillStyle = '0F0F0F';
        await Utils.renderEmoji(ctx, shorten(`${usertres.tag} - ${Utils.toAbbrev(leaderboard[2].coinsInWallet)}`, 50), 315, 430);
        
        ctx.textAlign = "left"
        ctx.font = '38px Segoe UI Black';
        ctx.fillStyle = '0F0F0F';
        await Utils.renderEmoji(ctx, shorten(`${userfour.tag} - ${Utils.toAbbrev(leaderboard[3].coinsInWallet)}`, 50), 315, 560);
            
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `leaderboard_.png`)
        return interaction.reply({ content: ` `, files: [attachment]})

    }
}

function shorten(text, len) {
    if (typeof text !== "string") return "";
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }