const fs = require('fs');
module.exports.run = async (bot, msg, args) => {
    if(args[0]==null){
        args[0]=msg.author.id
    }
    let to = []
        const voiceChannel = msg.member.voice.channel
        if (!voiceChannel || voiceChannel.type !== 'voice') {
            return;
        }
        voiceChannel.join().then(async (connection) => {
            await connection.play('./vc/sbeep.mp3');
            msg.channel.send('ok now, I will try to shutup <@'+msg.mentions.users.first()+'>')
            connection.on("speaking",
                (user, speaking) => {
                    console.log(speaking.bitfield)
                    to[user.id]=0
                    if (speaking.bitfield == 0) {
                        console.log('anda hu')
                        console.log('listning to ' + user.id)
                        console.log(args[0].replace(/[<@>!]/g, ''))
                        
                        if (user.id === args[0].replace(/[<@>!]/g, '')&&to[user.id]==0) {

                            setTimeout(() => {
                                try {
                                    const stream = fs.createReadStream(`./vc/lodu.pcm`);
                                    connection.play(stream, {
                                        type: "converted"

                                    })
                                    to[user.id]=undefined
                                } catch (error) {
                                    console.log(error)
                                }
                               
                            }, 2000)

                        }
                    }
                })
        })
    
}
module.exports.help = {
    name: "shutup"
}