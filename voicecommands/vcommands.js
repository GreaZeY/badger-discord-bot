const wavConverter = require('wav-converter')
const fs = require('fs');
const path = require('path')
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const {
    IamAuthenticator
} = require('ibm-watson/auth');
const {
    prefix
} = require('../config.json')
const speechToText = new SpeechToTextV1({
                                authenticator: new IamAuthenticator({
                                    apikey: process.env.IBM_key
                                }),
                                serviceUrl: process.env.IBM_url
                            });
const aibot = require('../aibot/aibot')
const playmusic = require('../Music commands/playmusic')
const googleTTS = require('google-tts-api');
const cleverbot = require("cleverbot-free")

var msgok
module.exports = async (bot, message, Discord) => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    if (message.content.toLowerCase() !== prefix + 'vchat') return
    if (message.member.voice.channel) {
        message.member.voice.channel.join().then(async (connection) => {
            await spch(`okay, now I am listening.`, connection)
            var cspcstxt
            message.channel.send(`ok, now listening to anyone talking in \`${connection.channel.name}\``)
            connection.on("speaking", async (user, speaking) => {
                if (speaking.bitfield == 1 && !message.author.bot) {
                    message.channel.send(`ok listening to ${user.username}`, {
                        files: ['./vc/rec/comdata/listening.gif']
                    }).then(msg => {
                        msgok = msg
                        setTimeout(()=>{
                            if(msg){
                                msg.delete
                            }
                        },10000)
                    })
                    try {
                        const audio = await connection.receiver.createStream(user.id, {
                            mode: 'pcm',
                            end: 'silence'
                        });
                        const pip = await audio.pipe(fs.createWriteStream(`./vc/rec/comdata/${user.username}_${user.id}.pcm`))
                        pip.on("finish", async () => {
                            //var pcmData 
                            
                           await fs.readFile(path.resolve(`./vc/rec/comdata/${user.username}_${user.id}.pcm`),async (err,data)=>{
                                var wavData = wavConverter.encodeWav(data, {
                                    numChannels: 2,
                                    sampleRate: 48000,
                                    byteRate: 320
                                })
                                await fs.writeFile(path.resolve(`./vc/rec/comdata/${user.username}_${user.id}.wav`), wavData, async (err)=>{
                                    const params = await {
                                        // From file
                                        audio: fs.createReadStream(`./vc/rec/comdata/${user.username}_${user.id}.wav`),
                                        contentType: 'audio/wav'
                                    };
                                    msgok.delete()
                                    message.channel.send('<a:loading:800761464184111114>').then(msg => {
                                        msgok = msg
                                        setTimeout(()=>{
                                            if(msg){
                                                msg.delete
                                            }
                                        },10000)
                                    })
                                    await speechToText.recognize(params)
                                        .then(response => {
                                            a = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(response.result, null, 2))))
                                            if(a.results[0]){
                                            console.log(a.results[0].alternatives)
                                            cspcstxt = a.results[0].alternatives[0].transcript
                                            }else{
                                                spch('You did not said anything or maybe, i did not understand what you said.',connection)
                                                cspcstxt = ''
                                                return
                                            }
                                            if (cspcstxt === '' | cspcstxt == undefined) return spch(`I didn't hear anything, ${user.username}`, connection)
                                        })
                                    if (cspcstxt === '' | cspcstxt == undefined) return
                                    msgok.edit('**' + user.username + '** said `' + cspcstxt + '`')
                                    ///////////////////////////////////-----------------Performs task on voice commands------------------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    result = await aibot(cspcstxt)
                                    if (result.fulfillmentText !== '') {
                                        if (!bot.player.isPlaying(message)) {
                                            if(result.intent.displayName==='Default Fallback Intent'){
                                                const reply = cleverbot(cspcstxt)
                                            spch(reply, connection)
                                            }else{
                                                spch(result.fulfillmentText, connection)
                                            }
                                        } else {
                                            if(result.intent.displayName==='Default Fallback Intent'){
                                                const reply = cleverbot(cspcstxt)
                                                    message.channel.send(reply)
                                                    
                                            }else{
                                                message.channel.send(result.fulfillmentText)
                                            }
                                        }
                                    }
                                    if (result.intent) {
                                        let args = cspcstxt
                                        bot.connection.set(message.guild.id, true)
                                        playmusic(bot, message, Discord, result)
                                        if (bot.player.getQueue(message)== undefined) {
                                            let commandfile = bot.commands.get(result.intent.displayName)
                                            if (commandfile) {
                                                a = await commandfile.run(bot, message, args, result);
                                                if (typeof a === 'string') await spch(a, connection)
                                                return
                                            }
                                        }
                                    }
                                    fs.unlink(`./vc/rec/comdata/${user.username}_${user.id}.pcm`, (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                    fs.unlink(`./vc/rec/comdata/${user.username}_${user.id}.wav`, (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });

                                })
                                
                            })
                            

                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        })
                    } catch (error) {
                        console.log(error)
                    }
                  
                }
            })
            
        });

    } else {
        message.channel.send("<a:nogif:797207020796379158> how can we voice chat if you are not in any voice channel!")
    }







    //////////////////////////////////////////////--------------------TTS function--------------------------------//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    async function spch(txt, connection) {
        const results = await googleTTS.getAudioUrl(txt, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
            splitPunct: ',.?',
            speed: 0.65
        })
        connection.play(results)

    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
