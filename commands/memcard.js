const jimp = require('jimp')
const moment = require('moment')
module.exports.run = async (bot, message) => {
  if (message.guild === null) return;
  let target = message.mentions.users.first() || message.author;
  let target_id = target.id
  if (message.guild.members.cache.has(target_id)) {
    target = message.guild.member(target_id);
  } else {
    message.channel.send("Unable to find user.").catch(console.error);
  }

  if (!target) return;
  let member = target;
  if (message.guild.ownerID === member.user.id) {
    aukat = 'Owner'
    desc = `${member.user.username} is owner of ${message.guild.name}, ${member.user.username} is god here.`
  } else if (member.hasPermission("ADMINISTRATOR")) {
    aukat = 'Administrator'
    desc = `${member.user.username} is an administrator in ${message.guild.name} be careful don't mess with any Admin.`
  } else if (member.hasPermission("MANAGE_CHANNELS", "MANAGE_ROLES", ) | member.hasPermission("MANAGE_GUILD", "MANAGE_CHANNELS")) {
    aukat = 'Moderator'
    desc = `${member.user.username} is a moderator in ${message.guild.name} be careful don't mess with any moderator.`
  } else if (member.roles.highest.name === '@everyone') {
    aukat = 'an ordinary member'
    desc = `${member.user.username} is an ordinary member in ${message.guild.name} tag him and ask something.`
  } else {

    aukat = member.roles.highest.name
    desc = `He is ${aukat} in ${message.guild.name} don't know much about that.`

  }
  let font40 = await jimp.loadFont('./font/cardfnth.fnt')
  let font32 = await jimp.loadFont('./font/cardfnt.fnt')
  let card = new jimp(1000,1074)
  let ul = await jimp.read('./images/card.png')
  jimp.read(member.user.displayAvatarURL({
    dynamic:true,
    format: 'png',
    size: 4096
  })).then(async (avatar) => { //We take the user's avatar
    avatar.resize(250, 250) //Resize it
    card.resize(1000, 1074)
    card.composite(avatar, 370, 80)
    card.composite(ul,0,0)
    card.print(font40, 520, 600, {
      text: `Position in ${member.guild.name}`,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 500, 50)
    card.print(font40, 520, 690, aukat)

    card.print(font32, 40, 600, `Tag : ${member.user.tag.length<=13?member.user.tag:member.user.username}`)
    card.print(font32, 40, 670, `ID : ${member.user.id}`)
    card.print(font32, 40, 740, `Nickname : ${member.nickname?(member.nickname.length>=10?member.nickname.slice(0,9)+'...':member.nickname):'None'}`)
    card.print(font32, 40, 810, `Highest role : ${member.roles.highest.name.length>=11?member.roles.highest.name.slice(0,10)+'...':member.roles.highest.name}`)
    card.print(font32, 40, 880, `Date of joining : ${moment.utc(member.joinedAt).format('DD/MM/YY')}`)


    card.print(font32, 520, 810, {
      text: desc,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 450, 50)
    card.print(font40, 250, 380, {
      text: member.user.username,
      alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 500, 50)
    card.getBuffer(jimp.MIME_PNG,(err,cb)=>{
      try {

        message.channel.send({
          files: [cb]
        })
      } catch (e) {}
      
    })
    
  })
}
module.exports.help = {
  name: "memcard"
}