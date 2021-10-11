const {prefix} = require('../config.json')
const tts = require('../tts reply/tts')
module.exports = async (bot,message,Discord,result) => {
  
  let loop = false
  let lq = false
 
bot.player.options.leaveOnEnd = false
bot.player.options.leaveOnStop = false
bot.player.options.leaveOnEmptyCooldown = 30000

  
    if (message.guild === null) return;
    if (message.author.bot) return;
    //if(!message.content.toLowerCase().startsWith(prefix)) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
if(result) intent = result.intent.displayName; else intent = null
    ///////////////////////////////////////////////--------------------------play-------------------------------////////////////////////////////////////////////////////////////////////////////
   
    if (command === "play"| command === "p"|intent==='intentplay') {
      if(intent) args = result.queryText.replace(result.parameters.fields.entityplay.stringValue, '').trim().split(' ')
      if (args.length === 0) return message.channel.send('<a:nogif:797207020796379158> Give me something to play'),tts(bot,message,'Give me something to play')
      if (message.member.voice.channel) {
        try{
        let track = await bot.player.play(message, args.join(' '), true);
        if (bot.player.isPlaying(message)&&bot.player.getQueue(message).tracks.length>1 ) {       //&& bot.player.getQueue(message).tracks.length>1
          message.channel.send(`<a:tickgif:797207019106730025> \`${bot.player.getQueue(message).tracks[bot.player.getQueue(message).tracks.length-1].title}\` added to queue, to view your queue type \`${prefix}q or ${prefix}queue\`.`)
        }
        }catch(err){
          console.log(err)
          if(err.context==='LiveVideo') return message.channel.send("<a:nogif:797207020796379158> Cannot play a live video!"),tts(bot,message,'Cannot play a live video')
          if(err.context==='UnableToJoin') return message.channel.send('<a:nogif:797207020796379158> I am not able to join your voice channel, please check my permissions!')

        }
      } else {
        message.channel.send("<a:nogif:797207020796379158> Join a voice channel first!")
      }
      return
    }
   
    ///////////////////////////////////////////-------------------------------Queue---------------------------------//////////////////////////////////////////////////////////////////////////////////////

    if (command === 'queue'|command === 'q'|intent ==='queue') {
      if (!bot.player.getQueue(message)) {
        message.channel.send('<a:nogif:797207020796379158> Queue is empty!')
        tts(bot,message,'Queue is empty!')
      } else {
        try{
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.guild.name+"'s Queue",message.guild.iconURL())
          .setTitle('List of all song requested by all users from this Guild.')
          .setDescription(bot.player.getQueue(message).tracks.map((t,i)=>`<a:Arrowrgb:797207018200891454> ${i+1}.\t${t.title}`).join('\n') + '\n')
          .setColor('#FF0000')
          .setFooter('React to navigate through list')
          message.channel.send(embed)
        //message.channel.send('```diff\n' + bot.player.getQueue(message).tracks.map((t,i)=>`- ${i+1})  ${t.title}`).join('\n') + '\n```')
      } catch(err){
        console.log(err)
      }
      }
      return
    }

    ///////////////////////////////////////////////--------------------------Pause----------------------------------------/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (command === 'pause'|intent ==='pause') {
      if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> I cannot pause while, I am not singing anything!'),tts(bot,message,'okay i am paused')
      try{
      bot.player.pause(message)
      }catch(err){
        console.log(err)
      }   
      return 
    }

    ///////////////////////////////////////////////--------------------------Resume----------------------------------------/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (command === 'resume'|command === 'res'|intent ==='resume') {
      if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> I cannot resume because, no one said pause to me!'),tts(bot,message,'resume,... resume what')
      try{
      bot.player.resume(message)
      }catch(err){
        console.log(err)
      }   
      return 
    }

    ///////////////////////////////////////////////--------------------------Skip----------------------------------------/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (command === 'skip'|intent ==='skip') {
      if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> I cannot skip beacuse, I am not singing anything!'),tts(bot,message,'what should i skip')
      if(bot.player.getQueue(message).tracks.length==1) return message.channel.send(`<a:nogif:797207020796379158> I cannot skip last song or just simply use \`${prefix}stop\`!`)
      try{
      bot.player.skip(message)
      }catch(err){
        console.log(err)
        }  
        return
    }

 ///////////////////////////////////////////////----------------------------stop----------------------------------------/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 if (command === 'stop'|intent ==='stop') {
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> What should, I stop huh!'),tts(bot,message,'what should i stop!')
  try{
  bot.player.stop(message)
  }catch(err){
    console.log(err)
  } 
  return   
}

///////////////////////////////////////////////----------------------------Remove song from queue------------------------//////////////////////////////////////////////////////////////////////////

if (command === 'remove'|command === 'r'|intent ==='remove') {
  if(intent==='remove'){
    args[0] = result.parameters.fields.number.numberValue
  }
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> Nothing is in Queue!'),tts(bot,message,'queue is empty')
  if(!Number.isInteger(parseInt(args[0], 10))) return message.channel.send('<a:l_:797208645036146688> Which song should, I remove in Queue!')
  if(parseInt(args[0], 10)<=0|parseInt(args[0], 10)> bot.player.getQueue(message).tracks.length) return message.channel.send('<a:nogif:797207020796379158> there is no track no. '+args[0]+'!')
  try{
  bot.player.remove(message , eval(parseInt(args[0], 10)-1))
  message.channel.send(`<a:tickgif:797207019106730025> Successfully removed track no. ${args[0]}`)
  }catch(err){
    console.log(err)
  }   
  return 
}

///////////////////////////////////////////////----------------------------Now Playing------------------------//////////////////////////////////////////////////////////////////////////

if (command === 'np'|command === 'nowplaying'|intent ==='nowplaying') {
  if(!bot.player.isPlaying(message)) return message.channel.send('Nothing is playing!'),tts(bot,message,'nothing!')
  try{
    let track = bot.player.nowPlaying(message)
    const pembed = new Discord.MessageEmbed()
      .setTitle(track.title)
      .setDescription(track.description)
      .setThumbnail(track.thumbnail ? track.thumbnail : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
      .setURL(track.url)
      .setAuthor('Now Playing','https://cdn.discordapp.com/emojis/797269779265617944.gif?v=1')
      .addFields({
        name: 'Duration',
        value: track.duration,
        inline: true
      }, {
        name: 'Views',
        value: track.views,
        inline: true
      }, {
        name: 'Author',
        value: track.author,
        inline: true
      })
      .addField('Progress Bar','00:00 '+bot.player.createProgressBar(message)+' '+track.duration)
      .setColor('FF0000')
      .setFooter(`requested by - ${track.requestedBy.username+'#'+track.requestedBy.discriminator}`, message.guild.member(track.requestedBy.id).user.displayAvatarURL())
    message.channel.send(pembed)
    }catch(err){
      console.log(err)
    }
    return
}


////////////////////////////////////////////////------------------------------Back---------------------------------//////////////////////////////////////////////////////////////////////////////

if (command === 'back'|intent ==='back') {
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> I cannot go back because, I have not started yet!'),tts(bot,message,'ok going back')
  try{
  bot.player.back(message)
  }catch(err){
    console.log(err)
    }  
    return
}


////////////////////////////////////////////////------------------------------Clear Queue---------------------------------//////////////////////////////////////////////////////////////////////////////

if (command === 'clearqueue'|command === 'cq'|intent ==='clearqueue') {
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> Queue is already empty!'),tts(bot,message,'Queue is already empty')
  try{
  bot.player.clearQueue(message)
  message.channel.send('Queue has been reset!')
  }catch(err){
    console.log(err)
    }  
    return
}

////////////////////////////////////////////////------------------------------loop current track---------------------------------//////////////////////////////////////////////////////////////////////////////

if (command === 'loop'|intent ==='loop') {
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> Nothing is playing to loop!'),tts(bot,message,'loop loop loop loop loop loop')
  try{
  if(loop){
    bot.player.setRepeatMode(message, false)
    loop = false
    message.channel.send('<a:okok:797219064107106315> Now the loop is off for this track.')
}else{
  bot.player.setRepeatMode(message,true)
  loop = true
    message.channel.send('<a:okok:797219064107106315> Now this track has been set on a loop.')
}
  }catch(err){
    console.log(err)
    }  
    return
}

////////////////////////////////////////////////---------------------------------removes loop on current track------------------------------//////////////////////////////////////////////////////////////////////////////

if (command === 'loopqueue'|command === 'lq'|intent ==='loopall') {
  if(!bot.player.isPlaying(message)) return message.channel.send('<a:nogif:797207020796379158> queue is empty, cannot loop a empty queue!'),tts(bot,message,'okay now we are in an infintiy loop')
  try{
  if(lq){
    bot.player.setLoopMode(message, false)
    lq = false
    message.channel.send('<a:okok:797219064107106315> Now the loop is off for this queue.')
}else{
  bot.player.setLoopMode(message, true)
  lq = true
  message.channel.send('<a:okok:797219064107106315> Now this queue has been set on a loop.')
}
  }catch(err){
    console.log(err)
    }  
    return
}










  

}