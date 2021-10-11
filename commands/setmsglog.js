const mongo = require('../schemas/mongo')
const msglogSchema = require('../schemas/msglog-schema')

module.exports.run = async (bot, message, args, cacheforlog) => {
    let permission = message.member.hasPermission("ADMINISTRATOR");
    if (!permission) return message.channel.send("<a:nogif:797207020796379158> You are missing the permission `ADMINISTRATOR`")
    if (args[0] == null) return message.channel.send("<a:l_:797208645036146688> You didn't specify a valid id or channel for the Message log channel!")
    let cArgs = args[0].replace(/[\\<>@#&!]/g, "")
    

    if (!message.guild.channels.cache.has(cArgs)) return message.channel.send("<a:l_:797208645036146688> You must specify a valid id or channel for the Message log channel!")
    await mongo().then(async (mongoose) => {
        try {
            await msglogSchema.findOneAndUpdate({
                _id: message.guild.id
            }, {
                _id: message.guild.id,
                channelId: cArgs,
            }, {
                upsert: true
            })
            cacheforlog[message.guild.id] = [cArgs]
            message.channel.send("<a:tickgif:797207019106730025> You have successfully set the Message log channel to " + args[0])
        } finally {
            mongoose.connection.close()
        }
    })

}
module.exports.help = {
    name: "msglogs"
}