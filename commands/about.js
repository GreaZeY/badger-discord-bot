const Discord = require('discord.js');
const {prefix} = require('../config.json')
module.exports.run = async (bot, message,_,_0,aichannels) => {
 channel = aichannels[message.guild.id]? `<#${aichannels[message.guild.id]}>`:'me'
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${bot.user.username} BOT `, bot.user.displayAvatarURL())
    .setFooter(`I can do too many tasks`)
    .setThumbnail(bot.user.avatarURL())
    .addField('NAME', `**${bot.user.username}**`, true)
    .setDescription("I am ***"+bot.user.username+"*** created to engage individuals on Discord, at whatever point you need assistance simply come to "+channel+" or use `"+prefix+"h` or `"+prefix+"help` or for more assistance DM me. \n\n**Features** : `Modmail`, `AI based user Interaction`, `Music`, `TTS`, `Welcome message`, `Memes`, `Images`")
    .addField('Version', '**2.0**', true)
    .addFields({
      name: '\u200B',
      value: '\u200B'
    }, )
    .addField('Creator/Developer', '**GreaZey#9750**', true)
    .addField('Latency/ping', `**<a:leftping:798507953501896735> ${Math.round(bot.ws.ping)} ms <a:rightping:798507954436702259> **`, true)

    .setColor("RANDOM")
  message.channel.send(embed);
}
module.exports.help = {
  name: ["about","abt"]
}