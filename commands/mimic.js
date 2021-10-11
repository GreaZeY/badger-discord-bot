const { Message } = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, msg) => {

    const voiceChannel = msg.member.voice.channel
    if (!voiceChannel || voiceChannel.type !== 'voice') {
      return;
    }
   voiceChannel.join().then(async (connection) => {
      await connection.play('./vc/sbeep.mp3')
    var i=[]
          
      connection.on("speaking",
       async (user, speaking) => {
        
        if (speaking.bitfield == 1) {
          if(i[user.id]==undefined){
          i[user.id] = 0
          }
          try{
          const audio = await connection.receiver.createStream(user.id, {
            mode: 'pcm',
            end: 'silence'
          });
          i[user.id]++
          const pip = await audio.pipe(fs.createWriteStream(`./vc/rec/${i[user.id]}_${user.username}_${user.id}.pcm`))
          pip.on("finish", () => {

           const stream = fs.createReadStream(`./vc/rec/${i[user.id]}_${user.username}_${user.id}.pcm`);
            connection.play(stream, {
              type: "converted"
            });
          })
          
        }catch(error){console.log(error)}
        }   
        })

        
         
        
    });  

}
module.exports.help = {
  name: "mimic"
}