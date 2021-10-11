const cleverbot = require('cleverbot-free')
module.exports.run = async (bot, message,_,result) => {
  
  if(!result.intent)
{
  let ca = message.content.slice(6)
  var sign = ca.substring(ca.length - 1, ca.length)
  console.log(sign)
  if (sign == '%' | sign == '+' | sign == '-' | sign == '*' | sign == '/') return message.reply("What do I do with this number.")
  if (!ca) return message.reply("Error!!!")
  try {
    message.reply(ca + " is " + eval(ca)).catch(console.error);
  } catch (e) {}

}else if(result.parameters.fields.number0.numberValue&&result.parameters.fields.operator.stringValue&&result.parameters.fields.number1.numberValue){
  message.channel.send(eval(result.parameters.fields.number0.numberValue+result.parameters.fields.operator.stringValue+result.parameters.fields.number1.numberValue))
}else{
  cleverbot(message.content).then(response => message.channel.send(response));
          
}

}
module.exports.help = {
  name: "calc"
}
