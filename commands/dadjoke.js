const joke = require('discord-jokes')
module.exports.run = async (bot, message) => {
 
  
  joke.getRandomDadJoke((jok)=>{
    message.channel.send(jok)

  })


}
module.exports.help = {
  name: "dadjoke"
}
