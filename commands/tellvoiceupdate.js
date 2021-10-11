const googleTTS = require('google-tts-api')
module.exports.run = async (bot, message) => {

    if (message.member.voice.channel) {
      await message.member.voice.channel.join()
        var connection = await message.guild.voice.connection
    }else {
        message.channel.send(":x: Join a voice channel first!")
      }

var vlistener = async (oldMember, newMember) => {
 if(newMember.guild !==message.member.guild| oldMember.guild!==message.member.guild) return
  console.log('lJL')
  if(!newMember.guild.voice.connection|| !oldMember.guild.voice.connection){
    console.log('off')
    bot.removeListener('voiceStateUpdate',vlistener)
}
    if(newMember.id === bot.user.id) return
    let newUserChannel = newMember.channelID
  let oldUserChannel = oldMember.channelID
  if(connection.channel.id  !== oldUserChannel&&connection.channel.id!==newUserChannel) return 

  if(oldUserChannel !== null){
    
    if (newMember.id === '335708571767537674'){const results = await googleTTS.getAudioUrl(`abe ${newMember.guild.members.cache.get(newMember.id).user.username}, lodu live band kar na chuteeiye nahi dekhna yaha kisi ko bhi!`, {
      lang: 'hi-IN',
      slow: false,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
      speed: 0.65
  })
  setTimeout(()=>{
    connection.play(results);
  },2000)
return}
if (newMember.id === '499239807772262411'){const results = await googleTTS.getAudioUrl(`are bihari, bhai tum band karlo pc to chalta nhi live kar dete ho!`, {
  lang: 'en-IN',
  slow: false,
  host: 'https://translate.google.com',
  splitPunct: ',.?',
  speed: 0.65
})
setTimeout(()=>{
connection.play(results);
},2000)
return}
    const results = await googleTTS.getAudioUrl(`${newMember.guild.members.cache.get(newMember.id).user.username}, started Livestreamig pata nhi kya dikhayega!`, {
      lang: 'hi-IN',
      slow: false,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
      speed: 0.65
  })
  
  setTimeout(()=>{
  connection.play(results);
},2000)

  }



    if(oldUserChannel === null && newUserChannel !== null) {
        const results = await googleTTS.getAudioUrl(`${newMember.guild.members.cache.get(newMember.id).user.username}, joined us`, {
            lang: 'hi-IN',
            slow: false,
            host: 'https://translate.google.com',
            splitPunct: ',.?',
            speed: 0.65
        })
        
        setTimeout(()=>{
        connection.play(results);
      },2000)

     } else if(newUserChannel === null){
        const resultsl = await googleTTS.getAudioUrl(`${newMember.guild.members.cache.get(newMember.id).user.username}, left`, {
            lang: 'hi-IN',
            slow: false,
            host: 'https://translate.google.com',
            splitPunct: ',.?',
            speed: 0.65
        })
        
        setTimeout(()=>{
        connection.play(resultsl);
      },2000)
   
     }
     

  }
  bot.on('voiceStateUpdate', vlistener)
    
}
module.exports.help = {
  name: "tll"
}