const Discord = require('discord.js');
module.exports.run = async (bot, message,args) => {
  if (message.guild === null) return;
  let permission = message.member.hasPermission("ADMINISTRATOR");
  if (!permission) return
  if (args[0] == null) return message.channel.send("<a:l_:797208645036146688> You didn't specify any channel!")
  let chan_id = args[0].replace(/[\\<>@#&!]/g, "")
  if (isNaN(chan_id) && !chan_id) return message.channel.send("<a:l_:797208645036146688> You must specify a valid channel!")
  if (!message.guild.channels.cache.has(chan_id)) return message.channel.send("<a:l_:797208645036146688> You must specify a valid id or channel!")
  delete args[0]
  let msg = args.join(' ').trim()
  if (!msg) return message.channel.send("⚠️ Sorry but i got nothing to announce!")
  let ch = bot.channels.cache.get(chan_id)
  const embed = new Discord.MessageEmbed()
    .setTitle('ANNOUNCEMENT <a:ezgif43efd258336e1:797920531085000774>')
    .setFooter('by ' + message.author.username,message.author.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(`**${msg}**`)
  ch.send('@everyone',embed);


}
module.exports.help = {
  name: "announce"
}