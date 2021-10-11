const googleTTS = require('google-tts-api')

module.exports.run = async (bot, message, args) => {
    if (message.author.bot | !message.guild) return;
    utterance = args.join(' ');
    if (utterance) {
        const results = googleTTS.getAllAudioUrls(utterance, {
            lang: 'en-IN',
            slow: false,
            host: 'https://translate.google.com',
            speed: 0.6
        })

        if (!message.member.voice.channel) return message.channel.send("<a:nogif:797207020796379158> Join a voice channel first!")
        if (!message.guild.voiceConnection) {
            try {
                var channelId = message.member.voice.channelID;
                var channel = bot.channels.cache.get(channelId);

                channel.join().then(async connection => {
                    await nxt(connection, results)

                });
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        message.channel.send("What should i say!").catch(console.error);
    }
    async function nxt(connection, results) {
        let dispatcher = connection.play(results[0].url);
        dispatcher.on("finish", async () => {
            results.shift()
            if (results.length > 0) {
                await nxt(connection, results)
            }


        })
    }






}
module.exports.help = {
    name: "say"
}
