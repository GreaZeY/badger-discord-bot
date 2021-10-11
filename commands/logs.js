const {
  prefix
} = require('../config.json')
const fs = require('fs')
var found = 0
module.exports.run =  (bot, message) => {

  let permission = message.member.hasPermission("ADMINISTRATOR");

  if (!permission) return message.channel.send("❌ You are missing the permission `ADMINISTRATOR`")

  fs.readdir("./sv log files/", (err, files) => {

    let jsfile = files.filter(f => f.split(".").pop() === "txt");
    jsfile.forEach(f => {
      if (f === `${message.guild.id}_LOG.txt`) {
        found = 1
      }
    });
  if (found == 0) {
    message.channel.send(`Message logs are turned off for this server, to enable it set a channel for message by using \`${prefix}msglogs <channel_name>\``)
  } else {
    message.author.send(`Your server's LOG FILE`, {
      files: [`./sv log files/${message.guild.id}_LOG.txt`]
    })

    message.channel.send("Your server's Log file has sent to your DM!")
  }
    if (err) throw err;
  });



  if (message.author.id === '437348488846770208') {
    message.author.send({
      files: [`./sv log files/LOG.txt`]
    })
  }

}
module.exports.help = {
  name: "logs"
}