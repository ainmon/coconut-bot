const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require("dotenv").config();

//Discord Collection
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter((f) => f.endsWith('.js'))
for (const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

function grabQuote(){
    return fetch('https://zenquotes.io/api/random')
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

const prefix = '!'

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`)
})

client.on('message', m => {

    if(!m.content.startsWith(prefix) || m.author.bot) return;

    const args = m.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(m, args)
    } else if (command === 'ticket') {
        client.commands.get('ticket').execute(m, args)
    } else if(command === 'quote') {
        grabQuote().then(q => m.channel.send(q))
    }

})

client.login(process.env.TOKEN)