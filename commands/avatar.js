const Discord = require('discord.js')
module.exports.run = async (bot, message) => {


    if (message.guild === null) return;
    let permission = message.member.hasPermission("MANAGE_CHANNELS");
    if (!permission) return;
    let target = message.mentions.users.first() || message.author;
    if (message.guild.members.cache.has(target.id)) {
        target = message.guild.member(target.id);
    } else {
        message.channel.send("Unable to find user.").catch(console.error);
    }

    if (!target) return;
    let color = "#a8e8eb";
    if (target.displayHexColor) {
        color = target.displayHexColor;
    }
    let embed = new Discord.MessageEmbed()
        .setAuthor(target.user.tag, target.user.displayAvatarURL({dynamic:true}))
        .setColor(color)
        .setImage(target.user.displayAvatarURL({dynamic:true,size:4096}) );
    message.channel.send(embed).catch(console.error);




}
module.exports.help = {
    name: ["av","avatar"]
}