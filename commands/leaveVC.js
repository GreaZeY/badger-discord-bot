module.exports.run = async (bot, message) => {
  if (message.author.bot | !message.guild) return;
  if (!message.guild.voice) return;
  if (!message.member.voice.channel) return
  const connection = message.guild.voice.connection
  if(message.member.voice.channel.id !==connection.channel.id) return
  if (connection) {
    message.reply('ok call me later at any time bye.')
    setTimeout(()=>{
      connection.disconnect()
    },2000)
    
  }

}
module.exports.help = {
  name: "leave"
}