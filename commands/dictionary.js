const querystring = require('querystring');
const fetch = require('node-fetch');
const Discord = require('discord.js')
const tts = require('../tts reply/tts')
module.exports.run = async (bot, message,args,result) => {
    let query
if(!result.intent){
    if (!args.length) {
        return message.channel.send('Can you please specify search term!');
      }
    
         query = querystring.stringify({ term: args.join(' ') });

}else{
  if(bot.connection.get(message.guild.id)){
    args = args.replace(result.parameters.fields.dict.stringValue, '').trim()
  }else{
    args = message.content.replace(result.parameters.fields.dict.stringValue, '').trim()
  }
if(args!==''){
    query =  querystring.stringify({ term: args });
}else{
  message.channel.send('Meaning of what?')
  tts(bot,message,'Meaning of what?')
  return
}
}

  const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
  if (!list.length) {
    tts(bot,message,`i don't know meaning of ${args}`)
  return message.channel.send(`I dont know meaning of **${args}**.`);

}

const [answer] = list;
answer.example=answer.example.replace(/[\[\]']+/g, "")

answer.definition=answer.definition.replace(/[\[\]']+/g, "")

const embed = new Discord.MessageEmbed()
	.setColor('00FFFF')
	.setTitle(answer.word)
	.setURL(answer.permalink)
	.addFields(
		{ name: 'Definition', value: answer.definition.length>1024?answer.definition.slice(0,1023):answer.definition },
		{ name: 'Example', value: !answer.example? 'no example for you today.':(answer.example.length>1024?answer.example.slice(0,1023):answer.example) },
	);

message.channel.send(embed);

   return answer.definition
    
}
module.exports.help = {
  name: "dict"
}