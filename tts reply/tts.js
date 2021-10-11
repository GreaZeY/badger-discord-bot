const googleTTS = require('google-tts-api');

module.exports = async (bot,message,text) => {
   if(!bot.connection.get(message.guild.id)) return
   connection = message.guild.voice.connection
    const results = await googleTTS.getAudioUrl(text, {
        lang: 'en-US',
        slow: false,
        host: 'https://translate.google.com',
        splitPunct: ',.?',
        speed: 0.65
    })
    bot.connection.set(message.guild.id,false)
    connection.play(results)

   


}