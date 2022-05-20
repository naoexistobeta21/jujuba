const User = require('../../src/database/Schemas/User')
const Discord = require('discord.js')

class Blacklist {

  static async add(i, user) {
      if(!user) return console.error("Você precisa definir o user!")

      const usuar = await User.findOne({ 
          IdU: user.id
    })

    if(!usuar) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
    if(usuar.perm === true) return i.update({ content: 'O Usuário já é admin', components: [], ephemeral: true})
    usuar.perm = true

          
    let embedadd = new Discord.MessageEmbed()
    .setTitle('Você virou admin, parabéns!')
    .setDescription(`**__Funcionalidades:__** usar o comando \`/blacklist\` ( caso banir um usuário sem motivo , vc que será banido! )`)
try{
    user.send({
    embeds: [embedadd]
})
} catch(err) {
    consoloe.log(`O Usuário ${user.tag} foi adcionado na minha lista de admins , mas eu nao consegui avisa-lo`)
}

    await usuar.save()

    return i.update({ content: `O Usuário ${user.username} virou admin!`, components: [], ephemeral: true})
  }

  static async remove(i, user) {
    if(!user) return console.error("Você precisa definir o user!")

    const usuari = await User.findOne({ 
        IdU: user.id
  })

  if(!usuari) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
  if(usuari.perm === false) return i.update({ content: 'O Usuário não é admin!', components: [], ephemeral: true})

  usuari.perm = false

  let embedremove = new Discord.MessageEmbed()
        .setTitle('Você não é admin!')
        .setDescription(`O nãoexisto#6702 te removeu da lista de admins meus!\nAgora você perdeu as funcionalidades admin.`)
    try{
        user.send({
        embeds: [embedremove]
    })
    } catch (err) {
        consoloe.log(`O Usuário ${user.tag} foi retirado a minha lista de admins , mas eu nao consegui avisa-lo`)
    }

  await usuari.save()

  return i.update({ content: `O Usuário ${user.username} foi retidado da minha lista de admins!`, components: [], ephemeral: true})
}

}

module.exports = Blacklist;