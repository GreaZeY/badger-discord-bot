const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
    if (message.guild === null) return;
    let target = message.mentions.users.first() || message.author;

    if (message.guild.members.cache.has(target.id)) {
        target = message.guild.member(target.id);
    } else {
        message.channel.send("Unable to find user.").catch(console.error);
    }
    if (!target) return;
    let member = target;
    var status, actType, actName, i = 0
    var rol = []
    member.roles.cache.forEach(role => {
        if (role.name === '@everyone') return rol[i] = role.name;
        rol[i] = `<@&${role.id}>`
        i++
    })
    for(i=0 ; i<member.presence.activities.length;i++){
        if(member.presence.activities[i].type==='CUSTOM_STATUS'){
             status = member.presence.activities[i].state

        }
        if(member.presence.activities[i].type==='PLAYING'||member.presence.activities[i].type==='WATCHING'||member.presence.activities[i].type==='LISTENING'||member.presence.activities[i].type==='STREAMING'){
             actType = member.presence.activities[i].type
             actName = member.presence.activities[i].name

        }
    }
    if(actType == undefined){
         act = 'Nothing'
    }else{
        act = `${actType} : ${actName}`
    }
    console.log(member.presence.activities)
    const embed = new Discord.MessageEmbed()
        .setFooter(`${member.user.username}'s User Info`,member.user.displayAvatarURL({dynamic:true}))
        .addField('Name with tag ', member.user.tag, true)
        .addField('ID ', member.id, true)
        .addField('Joined at ', member.joinedAt)
        .addField('Created On', member.user.createdAt)
        .addField('Current Status ', member.presence.status, true)
        .addField('Custom Status ', status|| 'Nothing', true)
        .addField(`Activity`, act, true)
        .addField('Roles assigned', rol)
        .setColor('RANDOM')
        .setThumbnail(member.user.displayAvatarURL({
            dynamic:true,
            size: 2048
        }).replace(".webp", ""))
    message.channel.send(embed);

}
module.exports.help = {
    name: "info"
}