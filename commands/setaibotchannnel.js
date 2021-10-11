const mongo = require('../schemas/mongo')
const aibotchanSchema = require('../schemas/aibotchan-schema')

module.exports.run = async (bot, message, args, _, cacheforai) => {


  let permission = message.member.hasPermission("ADMINISTRATOR");

  if (!permission) return message.channel.send("<a:nogif:797207020796379158> You are missing the permission `ADMINISTRATOR`")

  args[0] == null? cArgs=message.channel.id: cArgs = args[0].replace(/[\\<>@#&!]/g, "")


  if (!message.guild.channels.cache.has(cArgs)) return message.channel.send("<a:l_:797208645036146688> You must specify a valid id or channel!")

  await mongo().then(async (mongoose) => {
    try {
      await aibotchanSchema.findOneAndUpdate({
        _id: message.guild.id
      }, {
        _id: message.guild.id,
        channelId: cArgs,
      }, {
        upsert: true
      })
      cacheforai[message.guild.id] = [cArgs]
      message.channel.send("<a:tickgif:797207019106730025> You have successfully set  channel to <#" + cArgs+'>')
    } finally {
      mongoose.connection.close()

    }
  })



}
module.exports.help = {
  name: "aibotchan"
}