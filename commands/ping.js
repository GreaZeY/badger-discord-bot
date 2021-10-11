module.exports.run = async (bot, message) => {

  message.channel.send("<a:leftping:798507953501896735> `" + `${Math.round(bot.ws.ping)}` + " ms` <a:rightping:798507954436702259>")

}
module.exports.help = {
  name: "ping"
}