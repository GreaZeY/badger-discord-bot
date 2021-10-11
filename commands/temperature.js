let request = require('request');
const Discord = require('discord.js');
const tts = require('../tts reply/tts')
var temp = []
module.exports.run = async (bot, message,args,result) => {
  
if(!result.intent){
    city = args.join(' ').trim()
}else{
     city = result.parameters.fields.geocity.stringValue
}
if(!city | city==='') {
    tts(bot,message,'Temperature of which city?')
   message.channel.send('Temperature of which city?')
  return
}
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weather_api}`
  request(url,async function (_, _a, body) {
    tmp = await JSON.parse(body)
  if(tmp.message==='city not found'){
      tts(bot,message,`I didn't know **${city}** city exist, where it is?`)
    message.channel.send(`I didn't know **${city}** city exist, where it is?`)
    return
  } else {
    let mbd = new Discord.MessageEmbed()
    .setTitle(`Weather Report of `+tmp.name+' '+tmp.sys.country)
    .setDescription(tmp.weather[0].description)
    //.addField("Current Temperature",(tmp.main.feels_like-273))
    .addField("Today's Max. Temperature",(tmp.main.temp_max-273.15).toFixed(2)+'° C')
    .addField("Today's Min. Temperature",(tmp.main.temp_min-273.15).toFixed(2)+'° C')
    .addField("Humidity",tmp.main.humidity+'%')
    message.channel.send(mbd)
    temp[0] = await"Today's Maximum Temperature is "+(tmp.main.temp_max-273.15).toFixed(2)+' degree Celcius and'
    temp[1] = await "Minimum Temperature is "+(tmp.main.temp_min-273.15).toFixed(2)+' degree Celcius.'
  
      tts(bot,message,temp.join(' '))
  }

});

  }

module.exports.help = {
  name: ["temp","temperature"]
}