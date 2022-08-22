const Command = require('../../structures/Command')
const Discord = require("discord.js");
const { version } = require("discord.js");
const fetch = require('axios')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pokemon',
            description: '[ ⭐ POKEMON ] - Veja informações sobre um pokemon',
            options: [
                {
                    type: 'SUB_COMMAND',
                    name: 'view',
                    description: '[ ⭐ POKEMON ] Veja seus pokemons e suas informações',
                    options: [
                        {
                            type: 'STRING',
                            name: 'name',
                            description: 'Escreva um nome de pokemon, exemplo: pikachu',
                            required: true
                        }
                    ]
                }
            ]
        })
    }

    run = async (interaction) => {
        let dub = interaction.options.getSubcommand()
        let poke = interaction.options.getString('name')
        if(dub === 'view') {
            await interaction.reply('Procurando...')
            let pokemon = await renderPokemon(poke.toLowerCase())
            let typesPokemon = await AwaitTypesForPokemon(pokemon)
            let evolutions = await AwaitForPokemonEvolutions(pokemon)
            let raro = await RaridadeAwait(pokemon)
            let specie = await getSpecies(pokemon)
            let embed = new Discord.MessageEmbed()
            .setTitle(`${pokemon ? pokemon[0].number : 0} - ${pokemon ? pokemon[0].name : 'Não encontrado'}`)
            .setColor(pokemon ? 'YELLOW' : 'RED')
            .addFields(
                {
                    name: 'Tipos',
                    value: `${typesPokemon ? typesPokemon : '`Nenhum`'}`,
                    inline: true
                },
                {
                    name: 'Evoluções',
                    value: `${evolutions ? evolutions : '`Nenhuma`'}`,
                    inline: true
                },
                {
                    name: 'Raridade',
                    value: `\`${raro}\``,
                    inline: true
                },
                {
                    name: 'Espécie',
                    value: `\`${specie}\``,
                    inline: true
                }
            )
            .setThumbnail(pokemon ? pokemon[0].sprite : undefined)
            
            if(pokemon.error) {
                await interaction.editReply({ content: 'Não encontrado'})
            } else {
                await interaction.editReply({ embeds: [embed], content: ' '})
            }
            
        }


    }
}

async function getPokemonJson (pokemon)  {
    const apiResponse = await fetch(`https://pokeapi.glitch.me/v1/pokemon/${pokemon}`).catch((err) => { 
        return { data: false}
})
    const data = apiResponse.data
    return data
}

async function renderPokemon (pokemon) {
    const data = await getPokemonJson(pokemon)
    return data
}

async function AwaitTypesForPokemon (pokemon) {
    let content = ` `

    if(pokemon[0]) {
        for(let i = 0;i < pokemon[0].types.length ;i++) {
            content += ` \`${pokemon[0].types[i]}\` `
        }
    }
    

    if(content === ` `) return false


    return content
}

async function AwaitForPokemonEvolutions (pokemon) {
    let content = ` `

    if(pokemon[0]) {
        for(let i = 0;i < pokemon[0].family.evolutionLine.length;i++) {
            content += ` \`${pokemon[0].family.evolutionLine[i]}\` `
        }
    }
 

    if(content === ` `) return false

    return content
}

async function RaridadeAwait (pokemon) {
    if(!pokemon[0]) return `Nenhuma`
    if(pokemon[0].starter) return `inicial`
    if(pokemon[0].legendary) return `lendário`
    if(pokemon[0].mythical) return `Mítico`
    if(pokemon[0].ultraBeast) return `ultraBest`
    if(pokemon[0].mega) return `mega`
    return `normal`
}

async function getSpecies (pokemon) {
    if(!pokemon[0]) return `Sem espécie`
    return pokemon[0].species
}