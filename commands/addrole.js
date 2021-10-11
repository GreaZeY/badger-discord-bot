const config = require('../config.json')
module.exports.run = async (bot, message) => {
        if (message.guild === null) return;
        let permission = message.member.hasPermission("MANAGE_ROLES");
        if (!permission) return message.channel.send("❌ You are missing the permission `Manage Roles`");
        args = message.content.substring(config.prefix.length).split(" ");
        let rmember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);
        if (!rmember) return message.reply("Mention a user first!")
        let role = args.join(" ").slice(31)
        if (!role) return message.reply('Mention a role first!')
        let grole =message.guild.roles.cache.find(r => r.name === role);
        if (!grole) return message.reply("Can't find role "+role+" (case is sensitive or special fonts)!")
        rmember.roles.add(grole.id)
        message.channel.send(`${rmember} you are now ${grole.name} in ${message.guild.name}`)
 
}
module.exports.help = {
  name: "addrole"
}
