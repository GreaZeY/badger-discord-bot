module.exports.run = async (bot, message) => {
  if (message.author.bot | !message.guild) return;
  if (message.member.voice.channel) {
    message.member.voice.channel.join().then(connection=>{ connection.play('./vc/sbeep.mp3')}).catch(console.error)
    message.reply('Here, I am <a:ezgif6621d5fdd7dcf:797412288579371028> ');
  } else {
    message.channel.send("<a:nogif:797207020796379158> Join a voice channel first!")
  }



}
module.exports.help = {
  name: "join"
}