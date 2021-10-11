const mongo = require('../schemas/mongo')
const welcomeSchema = require('../schemas/welcome-schema')
module.exports.run = async (bot, message, args, _, _0, cacheforwel) => {
  console.log(cacheforwel)
  let permission = message.member.hasPermission("ADMINISTRATOR");
  if (!permission) return message.channel.send("<a:nogif:797207020796379158> You are missing the permission `ADMINISTRATOR`")
  if (args[0] == null) return message.channel.send("<a:l_:797208645036146688> You didn't specify a valid id or channel for the welcome channel!")
  let cArgs = args[0].replace(/[\\<>@#&!]/g, "")
  delete args[0]
  if (!message.guild.channels.cache.has(cArgs)) return message.channel.send("<a:l_:797208645036146688> You must specify a valid id or channel for the welcome channel!")
  await mongo().then(async (mongoose) => {
    try {
      await welcomeSchema.findOneAndUpdate({
        _id: message.guild.id
      }, {
        _id: message.guild.id,
        channelId: cArgs,
        text: args.join(' ').trim()
      }, {
        upsert: true
      })
      cacheforwel[message.guild.id] = [cArgs, args.join(' ').trim()]
      message.channel.send("<a:tickgif:797207019106730025> You have successfully set the Message log channel to <#" + cArgs+">")
    } finally {
      mongoose.connection.close()
    }
  })

}
module.exports.help = {
  name: "welchan"
}
