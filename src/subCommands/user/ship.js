//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/User')
const Money = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const moment = require('moment')
const Discord = require('discord.js');
const Canvas = require('canvas');
const path = require('path')

module.exports = async (client, interaction, t) => {
        interaction.reply({ content: '<a:Load:991154788714692678> Montando ship.png...'})
        let membro1 = interaction.options.getUser('user1')
		let membro2 = interaction.options.getUser('user2')

       // return interaction.reply({ content: 'Ahh, desculpe mas esse comando está em manutenção temporária', ephemeral: true })
        let money = await Money.findUser(interaction.user.id, '968570313027780638')
        let user = await User.findOne({ user: interaction.user.id})
        let button = new MessageButton()
        .setLabel('Editar valores ship')
        .setStyle('SUCCESS')
        .setCustomId(`edit${interaction.user.id}`)
        .setEmoji('<:edit:987228412554924073>')
        .setDisabled(true)

        let add = new MessageButton()
        .setLabel('Editar')
        .setEmoji('<:set:987232445449535528>')
        .setCustomId(`confirm${interaction.user.id}`)
        .setStyle('SUCCESS')

        let remove = new MessageButton()
        .setLabel('Remover')
        .setEmoji('<:remove:987234088953983006>')
        .setCustomId(`remove${interaction.user.id}`)
        .setStyle('DANGER')

        let zero = new MessageButton()
        .setLabel('0%')
        .setCustomId(`zero${interaction.user.id}`)
        .setStyle('SECONDARY')

        let vinte = new MessageButton()
        .setLabel('25%')
        .setCustomId(`vinte${interaction.user.id}`)
        .setStyle('SECONDARY')

        let cinquenta = new MessageButton()
        .setLabel('50%')
        .setCustomId(`cinquenta${interaction.user.id}`)
        .setStyle('SECONDARY')

        let setenta = new MessageButton()
        .setLabel('75%')
        .setCustomId(`setenta${interaction.user.id}`)
        .setStyle('SECONDARY')

        let cem = new MessageButton()
        .setLabel('100%')
        .setCustomId(`cem${interaction.user.id}`)
        .setStyle('SECONDARY')

        let row = new MessageActionRow().addComponents(button)
        let row2 = new MessageActionRow().addComponents(add, remove)
        let row3 = new MessageActionRow().addComponents(zero, vinte, cinquenta, setenta, cem)
        if(!membro2) {
            membro2 = interaction.user
            button.setDisabled(false)
        }

        let user2 = await User.findOne({ user: membro2.id })
        let user1 = await User.findOne({ user: membro1.id })
        //if(membro1 === interaction.user)
		if (membro1 === membro2) return interaction.reply('Mencione duas pessoas diferentes.');
		let amor = Math.floor(Math.random() * 100);
        let test;
        if(user1) {
        for(let i = 0;i < user1.ships.length;i++) {
            if(user1.ships[i].name === membro1.id && user1.ships[i].nametwo === membro2.id || user1.ships[i].name === membro2.id && user1.ships[i].nametwo === membro1.id) {
                amor = user1.ships[i].value
                test = 1
            }
            
        }
}
        
        if(user2) {
        for(let i = 0;i < user2.ships.length;i++) {
            if(user2.ships[i].name === membro1.id && user2.ships[i].nametwo === membro2.id || user2.ships[i].name === membro2.id && user2.ships[i].nametwo === membro1.id) {
                amor = user2.ships[i].value
                test = 1
            }
            
        }
            }
		let emoticon;
		if (amor > 60) {
			emoticon =
				'https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png'; //imagem de coração
		} else if (amor >= 40) {
			emoticon =
				'https://cdn.discordapp.com/attachments/862566063090171995/886727763560661022/1f937-2642.png'; //imagem de sei lá
		} else {
			emoticon =
				'https://cdn.discordapp.com/attachments/862566063090171995/886727631133892649/1f62d.png'; //imagem chorando
		}
		const canvas = Canvas.createCanvas(730, 346);
		const ctx = canvas.getContext('2d');
		const emote = await Canvas.loadImage(emoticon);
		const foto1 = await Canvas.loadImage(
			membro1.displayAvatarURL({ format: 'png' })
		);
		const foto2 = await Canvas.loadImage(
			membro2.displayAvatarURL({ format: 'png' })
		);

        let rand = (amor * 673) / 100

        let grd = ctx.createLinearGradient(0, rand, 200, 0);
        grd.addColorStop(0, "#ac07f2");
        grd.addColorStop(2, "red"); //#a20afa
        grd.addColorStop(0, "#a20afa");
        ctx.fillStyle = grd;
        ctx.fillRect(28, 252, rand,72)


        let img = await Canvas.loadImage('./layout_ship.png')
        ctx.drawImage(foto1, 52, 65, 185, 185);
		ctx.drawImage(foto2, 492, 55, 185, 185);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(emote, 290, 90, 128, 128);

        ctx.textAlign = "left"
        ctx.font = `48px Segoe UI Black`; //sobmim
        ctx.fillStyle = '#000000';
        ctx.fillText(`${amor}%`, 37, 310)

        let kkkk = new Discord.MessageAttachment(canvas.toBuffer(), 'ship.png')
        const emb = new Discord.MessageEmbed().setImage(kkkk.url)
        
        
        let mensage = await interaction.editReply({ files: [kkkk], components: [row], fetchReply: true});

        const filter = i => i.user
        const collector = mensage.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
    if(i.user.id !== interaction.user.id) return i.reply({ content: 'Você não pode usar este botão!', ephemeral: true})
	if (i.customId === `edit${interaction.user.id}`) {
        if(money.coinsInWallet < 250) {
            add.setDisabled(true)
        }
        if(test === 1) {
            remove.setDisabled(false)
            add.setDisabled(true)
        } else {
            add.setDisabled(false)
            remove.setDisabled(true)
        }

        i.update({ components: [row2] })
	}
    if(i.customId === `confirm${interaction.user.id}`) {
        i.update({ components: [row3]})
    }
    if(i.customId === `remove${interaction.user.id}`) {
        for(let i = 0;i < user.ships.length;i++) {
            if(user.ships[i].name === membro1.id && user.ships[i].nametwo === membro2.id || user.ships[i].name === membro2.id && user.ships[i].nametwo === membro1.id) {
                user.ships.remove(user.ships[i])
            }

            
        }
        i.update({ components: []})
    }
    if(i.customId === `zero${interaction.user.id}`) {
        let ar = {
            name: membro1.id,
            nametwo: membro2.id,
            value: 0
        }
        user.ships.push(ar)
        Money.deductCoins(interaction.user.id, '968570313027780638', 250)
        i.update({ components: []})
    }
    if(i.customId === `vinte${interaction.user.id}`) {
        let ar = {
            name: membro1.id,
            nametwo: membro2.id,
            value: 25
        }
        user.ships.push(ar)
        Money.deductCoins(interaction.user.id, '968570313027780638', 250)
        i.update({ components: []})
    }
    if(i.customId === `cinquenta${interaction.user.id}`) {
        let ar = {
            name: membro1.id,
            nametwo: membro2.id,
            value: 50
        }
        user.ships.push(ar)
        Money.deductCoins(interaction.user.id, '968570313027780638', 250)
        i.update({ components: []})
    }
    if(i.customId === `setenta${interaction.user.id}`) {
        let ar = {
            name: membro1.id,
            nametwo: membro2.id,
            value: 75
        }
        user.ships.push(ar)
        Money.deductCoins(interaction.user.id, '968570313027780638', 250)
        i.update({ components: []})
    }
    if(i.customId === `cem${interaction.user.id}`) {
        let ar = {
            name: membro1.id,
            nametwo: membro2.id,
            value: 100
        }
        user.ships.push(ar)
        Money.deductCoins(interaction.user.id, '968570313027780638', 250)
        i.update({ components: []})
    }

    user.save()
    console.log(user.ships)
});

collector.on('end', collected => {
});
     }
    