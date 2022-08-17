const fs = require("fs");
const Discord = require("discord.js")

module.exports = (client) => {
     fs.readdirSync('./src/prefixcommands/').forEach(local => {
        const comandos = fs.readdirSync(`./src/prefixcommands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

        for(let file of comandos) {
            let puxar= require(`../prefixcommands/${local}/${file}`)

            if(puxar.name) {
                client.prefixes.set(puxar.name, puxar)
            }
          
            if(puxar.aliases && Array.isArray(puxar.aliases))
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
        }
    })
}