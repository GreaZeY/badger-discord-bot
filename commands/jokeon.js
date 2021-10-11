const joke = require('discord-jokes')
module.exports.run = async (bot, message,args,result) => {
 if(!result.intent){
  if(args[0]==null) return message.reply("Joke on what, give me person's name!")
 }else{
  args = message.content.replace(result.parameters.fields.jokeon.stringValue, '').trim().split(' ')
  
  if(args[0]==null) return message.reply("Joke on what, give me person's name!")
 }
  

  if(args[1]==null) {args[1]=''}
  joke.getCustomJoke(args[0],args[1],(jok)=>{
    message.channel.send(jok)

  })
 


}
module.exports.help = {
  name: "jokeon"
}
