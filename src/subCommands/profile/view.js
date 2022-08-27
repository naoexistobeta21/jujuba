const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas')
const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Textbox = require('@borgar/textbox')


const Utils = require("../../util/Util.js")

//const Levels = require('discord-xp')
const User = require('../../database/Schemas/User')
//const config = require("../../botconfig/config.json");

const { registerFont } = require('canvas')
registerFont('helsinki.ttf', { family: 'helsinki' })
registerFont('IndieFlower-Regular.ttf', { family: 'indieFlower-Regular'}) //Segoe UI Black
registerFont('Segoe UI Black.ttf', { family: 'Segoe UI Black'})

module.exports = async (client, interaction, t) => {

      let embed = new MessageEmbed()
      .setDescription('<a:Load:991154788714692678> Montando profile...')
      .setColor('DARK_VIVID_PINK')
      .setFooter({ text: 'Pode demorar um pouco.'})
      await interaction.reply({ embeds: [embed]})
        
        
        
        let user = interaction.options.getUser('user')
        if(!user) user = interaction.user;

        const usac = await User.findOne({
            user: user.id
        });
            
            const canvas = Canvas.createCanvas(800, 600)
            const ctx = canvas.getContext("2d")
                    
            let avatar = user.displayAvatarURL({ dynamic: false, format: "png", size: 1024 });
                    
            let a = 'https://i.imgur.com/mAuJOud.png'
            if(usac) a = usac.profile.layout.background
            if(!a.includes('https') || !a.includes('http')) a = 'https://i.imgur.com/mAuJOud.png'
            let fundo = await 
            Canvas.loadImage(a)
            ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)
            
            const TargetAvatar = await Canvas.loadImage(`${avatar}`)
            ctx.drawImage(TargetAvatar, 15, 415, 140, 140)
    
            let layout = await 
            Canvas.loadImage("./src/images/jujuba_profile.png")
            ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

            let corNick = '#F8F8F8'
            if(usac) {
              if(usac.status.premium.type === 'on') {
                corNick = '#FC0303'
              } else {
                corNick = '#F8F8F8'
              }
            }
                    
            ctx.textAlign = "left"
            ctx.font = '48px Segoe UI Black';
            ctx.fillStyle = corNick;
            await Utils.renderEmoji(ctx, shorten(user.username, 15), 160, 450);
            
            let reputation = usac ? usac.profile.reps.count : 0
            if(reputation > 998) reputation = 999

            ctx.textAlign = "left"
            ctx.font = '40px Segoe UI Black';
            ctx.fillStyle = '#FFFFFF';
            await Utils.renderEmoji(ctx, `${reputation} reps`, 645, 435);

            let aboutme = usac ? usac.profile.layout.sobremim : 'A Jujuba é fofa! ,  personalize com /profile aboutme'
            
            ctx.textAlign = "left"
            ctx.font = '22px Segoe UI Black';
            ctx.fillStyle = '#2e2d2d';
            await Utils.renderEmoji(ctx, `${shorten(aboutme, 40)}`, 160, 500)
                    
            let list = [];
                    
            const flags = user.flags === null ? "" : user.flags.toArray()
            list.push(flags)
            
            let onwer = '947856944515936306'
                    
            if(user.id === onwer) {
                list.push("EARLY_VERIFIED_DEVELOPER")
            }

            if(usac) {
              if(usac.status.staff.perm === true) {
                list.push("ADMIN")
              }
  
              if(usac.status.premium.status === true) {
                list.push("VIP")
              }
  
              for(let i = 0;i < usac.badges.length;i++) {
                list.push(`${usac.badges[i]}`)
              }
            }

            
    
            list = list.join("")
            
            
            .replace("EARLY_VERIFIED_DEVELOPER", '<:dev:874717224047374417>')
            .replace("HOUSE_BRAVERY", '<:HypeSquadBravery:878201508032827423>')
            .replace("HOUSE_BRILLIANCE", '<:HypeSquadBrilliance:879899227034120253>')
            .replace("HOUSE_BALANCE", '<:HypeSquadBalance:878201328101392394>')
            .replace("VERIFIED_BOT", '<:emoji_23:989282906834870282>')
            .replace("ADMIN", '<:Javascript:883757487931670598>')
            .replace("TESTES", '<:TCC_IconBugHunterBadge:879901392779739216>')
            .replace("VIP", "<:vipd:904818002988531762>")
            .replace("GRATIAN", "<:gratian:962487783518273536>")
            .replace("CARAMELO", "<:jujuba_wow:981613679843885056>")
            .replace("BOT_HTTP_INTERACTIONS", "<:svg:1012917259028664390>")
            
            

            ctx.textAlign = "left"
            ctx.font = `32px "helsinki"`
            await Utils.renderEmoji(ctx, list.split(",").join(" "), 2, 597);

            try {
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `profile.jpg`)
           interaction.editReply({ embeds: [], files: [attachment]})
            
            } catch (err) {
            return interaction.editReply({ content: `Não consegui montar o perfil do usuário.\n\`\`\`\n${err}\n\`\`\``, embeds: []})
            }

        //interaction.editReply({ content: 'este comando esta em desenvolvimento.', ephemeral: true})
    }
    
function shorten(text, len) {
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }