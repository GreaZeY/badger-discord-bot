const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
 module.exports.run = async (bot, message) => {
const MessageEmbed = new Discord.MessageEmbed()
.setAuthor(bot.user.tag, bot.user.displayAvatarURL())
.setTitle("About "+bot.user.username)
.setURL('https://top.gg/bot/609713401777618965')
.setDescription('I am a AI client interactive bot, I can do a lot of stuff still in development phase though. Invite me to your server and test me out. To know more about Badger click on **About Badger** \n\n**Features** : `Modmail`, `AI based user Interaction`, `Music`, `TTS`, `Welcome message`, `Memes`, `Images`')
.addField('***Link : ***','***[Invite me please <a:ezgif6621d5fdd7dcf:797412288579371028>](https://discord.com/oauth2/authorize?client_id=609713401777618965&scope=bot&permissions=1610083448)***')
    message.author.send(MessageEmbed)
    
   message.channel.send('https://top.gg/bot/609713401777618965')
}
module.exports.help = {
  name: ['inv','invite']
}
