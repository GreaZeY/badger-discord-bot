module.exports.run = async (bot, message, args) => {

    if (message.guild === null) return;

  
    let permission = message.member.hasPermission("MANAGE_CHANNELS");
    if (!permission) {
        message.reply("<a:nogif:797207020796379158> You are missing the permission `MANAGE CHANNELS`");
        setTimeout(function () {
            message.channel.bulkDelete(1,true);
        }, 3000);
    }
    if (!permission) return;
    if (!args[0]) {
        message.reply("<a:l_:797208645036146688> How many chats should, I delete!");
        setTimeout(function () {
            message.channel.bulkDelete(1,true);
        }, 3000);
    }
    if (!args[0]) return;

    args[0]++;
    if (args[0] >= 100) return message.reply("Limit is 1 to 98");
    message.channel.bulkDelete(args[0],true).then((message.reply('<a:tickgif:797207019106730025> Done!').then(msg=>{ 
        
    setTimeout(()=> {
        msg.delete();
    }, 3000);
})))

}
module.exports.help = {
    name: ["cls","clear","del","delete"]
}