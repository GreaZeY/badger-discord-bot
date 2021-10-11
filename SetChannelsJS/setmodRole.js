const mongo = require('../schemas/mongo')
const modmailRoleSchema = require('../schemas/modmailRole-schema')
const {prefix} = require('../config.json')
module.exports = async (bot, message, args,cacheforRole) => {
    if(message.content.toLowerCase().startsWith(prefix+'setstaff')){
    let permission = message.member.hasPermission("ADMINISTRATOR");
    if (!permission) return message.channel.send("<a:nogif:797207020796379158> You are missing the permission `ADMINISTRATOR`")
    if (args[0] == null) return message.channel.send("<a:l_:797208645036146688> You didn't specify a valid id of Role!")
    
    let cArgs = args[0].replace(/[\\<>@#&!]/g, "")
    

    if (!message.guild.roles.cache.has(cArgs)) return message.channel.send("<a:l_:797208645036146688> You must specify a valid id of Role!")
    await mongo().then(async (mongoose) => {
        try {
            await modmailRoleSchema.findOneAndUpdate({
                _id: message.guild.id
            }, {
                _id: message.guild.id,
                channelId: cArgs,
            }, {
                upsert: true
            })
            cacheforRole[message.guild.id] = [cArgs]
            message.channel.send("<a:tickgif:797207019106730025> You have successfully set the Mod Role to <@&" + args[0]+'>')
        } finally {
            mongoose.connection.close()
        }
    })
    }
}
