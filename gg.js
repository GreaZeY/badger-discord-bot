//////////////////////////////////////////------------------------Definition for all js packages--------------------------////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const fs = require("fs");
const jimp = require('jimp');
const db = require('quick.db');
const config = require("./config.json");
const playmusic = require('./Music commands/playmusic');
const funimages = require('./Funimages/funimages');
const mongo = require('./schemas/mongo');
const welcomeSchema = require('./schemas/welcome-schema');
const msglogSchema = require('./schemas/msglog-schema');
const modmailRoleSchema = require('./schemas/modmailRole-schema');
const aibotchanSchema = require('./schemas/aibotchan-schema');
const aibot = require('./aibot/aibot');
const cleverbot = require("cleverbot-free")
const setstaff = require('./SetChannelsJS/setmodRole');
const vcommand = require('./voicecommands/vcommands');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.connection = new Discord.Collection();
const {
  Player
} = require("discord-player");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////------------------------Reads all js files in commands--------------------------////////////////////////////////////////////////////////////////////////////////
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("reconnecting", () => console.log("Bot reconnecting...", "log"))
const cacheforwel = {},
  cacheforlog = {},
  cacheforai = {},
  cacheforRole = {}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////----------------will return now playing-----------------------///////////////////////////////////////////////////////////////////////////////
const player = new Player(bot);
bot.player = player;
bot.player.on('trackStart', (message, track) => {
  const pembed = new Discord.MessageEmbed()
    .setTitle(track.title)
    .setDescription(track.description)
    .setThumbnail(track.thumbnail ? track.thumbnail : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
    .setURL(track.url)
    .setAuthor('Now Playing', 'https://cdn.discordapp.com/emojis/797269785250627655.gif?v=1')
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
    .setColor('FF0000')
    .setFooter(`requested by - ${track.requestedBy.username+'#'+track.requestedBy.discriminator}`, message.guild.member(track.requestedBy.id).user.displayAvatarURL())

  message.channel.send(pembed)
  if (Math.floor(Math.random() * 5) == 3) {
    message.channel.send(`Ohh <a:ezgif65f52d4b469a2:797412289347190784> ${track.title} is my favourite song thanks for playing it.`)
  }
})


//////////////////////////////////////////------------------------Reads all js files in commands--------------------------/////////////////////////////////////////////////////////////////////
fs.readdir("./commands/", (err, files) => {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i+1}.  ${f} loaded!`);
    if (typeof props.help.name === 'object') {
      props.help.name.forEach(name => bot.commands.set(name, props))

    } else {
      bot.commands.set(props.help.name, props);
    }
  });
  if (err) throw err;
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("ready", () => {
  bot.user.setPresence({
    status: "idle",
  });
  console.log(bot.guilds.cache.map(g => g.name))
  setInterval(function () {
    let statuses = [
      "~help in all channel",
      'over ' + bot.guilds.cache.size + ' guilds',
      "to `come talk to me`, I'm bored now",
      "~invite to invite me"
    ]
    let status = statuses[Math.floor(Math.random() * 3)]
    bot.user.setActivity(status, {
      type: "STREAMING",
      url: 'https://www.youtube.com/watch?v=DygshuuJBKc',

    });
  }, 30000)
  console.log("Logged in as " + bot.user.tag)
});


funimages(bot, Discord)
///////////////////////////////////////////////////-------------------------main logic------------------------/////////////////////////////////////////////////////////////////////////////////////////////////////
bot.on("message", async function (message) {
  if (message.guild === null) return;
  if (message.author.bot) return;
  let content = message.content.split(" ");
  let command = content[0].toLowerCase();
  let args = content.slice(1);
  setstaff(bot, message, args,cacheforRole)
  if (!message.content.toLowerCase().startsWith(config.prefix)) {
    var msg = message.content;
    if (message.author.bot) return;
    let dataforai = cacheforai[message.guild.id]
    if (dataforai === 0) return 
    if (!dataforai) {
      await mongo().then(async (mongoose) => {
        console.log("fetching...")
        try {
          const result = await aibotchanSchema.findOne({
            _id: message.guild.id
          })
          if (!result) {
            cacheforai[message.guild.id] = dataforai = 0;
          } else {
            cacheforai[message.guild.id] = dataforai = [result.channelId]
            //console.log("try " + dataforai)
          }

        } finally {
          mongoose.connection.close()
        }
      })
    }
    if (!dataforai) return;
    if (!message.guild.channels.cache.has(dataforai[0])) return;

    if (dataforai[0] === null | !dataforai[0]) return;
    if (message.channel != dataforai[0]) return;
    if (message.content.length > 255) return message.channel.send("Made it in 20 words or less, I am very busy.")
    await aibot(msg).then(async result => {
      console.log(`  Intent: ${result.intent.displayName}`);
      console.log('confidence :' + result.intentDetectionConfidence)
      try {
        async function test(){
          cleverbot(message.content).then(response => message.channel.send(response));
   
          }       
if (result.fulfillmentText !== '') {
          message.channel.startTyping();
          if (result.intent.displayName === 'Default Fallback Intent') {
            setTimeout(function () {
              test()
              message.channel.stopTyping();
            }, 2000);

          } else {
            setTimeout(function () {
              message.channel.send(result.fulfillmentText)
              message.channel.stopTyping();
            }, 2000);
          }
        }
        if (result.intent) {
          //////////////////////////////////////////////-----------------------------Act on intent-------------------------------//////////////////////////////////////////////////////////////////////////////
          if (result.intentDetectionConfidence < 0.6) {
            message.channel.startTyping();
            setTimeout(function () {
              test()
              message.channel.stopTyping();
            }, 2000);

          } else {
            let commandfile = bot.commands.get(result.intent.displayName)
            if (commandfile) return commandfile.run(bot, message, args, result);
            if (bot.player.isPlaying(message) | result.intent.displayName === 'intentplay') {
              playmusic(bot, message, Discord, result)
            } else if (result.fulfillmentText === '') {

              message.channel.startTyping();
              setTimeout(function () {
                test()
                message.channel.stopTyping();
              }, 2000);
            }
          }

        } else {
          console.log(`  No intent matched.`);
        }
      } catch (e) {}
    })
  }
  //////////////////////////////////////////////--------------------checks if message contains a command and runs it----------------------------------------/////////////////////////////////////////////
  vcommand(bot, message, Discord)
  playmusic(bot, message, Discord)
  let commandfile = bot.commands.get(command.slice(config.prefix.length))
  if (commandfile) commandfile.run(bot, message, args, cacheforlog, cacheforai, cacheforwel);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})

////////////////////////////////////////////------------------------Welcome msg on member join----------------------------////////////////////////////////////////////////////////////////////////////////
bot.on('guildMemberAdd', async function (member) {

  let dataforwel = cacheforwel[member.guild.id]
  //console.log("outside try " + dataforwel)
  if (dataforwel === 0) return //console.log('dataforwel is undefined')
  if (!dataforwel) {
    await mongo().then(async (mongoose) => {
      try {
        const result = await welcomeSchema.findOne({
          _id: member.guild.id
        })
        if (!result) {
          cacheforwel[member.guild.id] = dataforwel = [0, 0];
        } else {
          cacheforwel[member.guild.id] = dataforwel = [result.channelId, result.text]
        }

      } finally {
        mongoose.connection.close()
      }
    })
  }
  if (!dataforwel) return;
  if (!member.guild.channels.cache.has(dataforwel[0])) return;
  //if (!bot.hasPermission("SEND_MESSAGES")) return
  if (!dataforwel[0] | dataforwel[0] === null) return;


  let font64 = await jimp.loadFont('./font/redglow.fnt')
  let mask = await jimp.read('./images/mask.png')
  let welcome = await jimp.read('./images/wel.png')
  let text = dataforwel[1].replace("member", `<@${member.id}>`)
  let ser = member.guild.name

  //member.addRole(member.guild.roles.cache.find("name", "Greasers"))
  jimp.read(member.user.displayAvatarURL({
    format: 'png',
    size: 4096
  })).then(avatar => {
    avatar.resize(280, 280)
    mask.resize(280, 280)
    avatar.mask(mask)
    welcome.resize(1100, 550)

    welcome.print(font64, 360, 150, {
      text: `Welcome ${member.user.username}`,
      alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 600, 50)
    welcome.print(font64, 670, 200, {
      text: `to`,
      alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 1, 1)
    welcome.print(font64, 375, 340, {
      text: ser,
      alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 600, 50)
    welcome.composite(avatar, 100, 135)
    try {
      welcome.getBuffer(jimp.MIME_PNG, (err, cb) => {
        member.guild.channels.cache.get(dataforwel[0]).send(text, {
          files: [cb]
        })
        if (member.user.bot) return
      })
      member.send(`🤗Welcome to ${ser} ${member}, ENJOY!!!🤗 you are ` + member.guild.memberCount + "th member and message me for any kind help");
    } catch (e) {
      console.log(e)
    }

  })


})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////------------------------------Message Logs------------------------------///////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', async (msg) => {
  if (msg.content === '') return;
  if (msg.guild === null) return;
  if (msg.content.toLocaleLowerCase().startsWith('-p') | msg.content.toLocaleLowerCase().startsWith('-play')) {
    if (Math.floor(Math.random() * 5) == 3) {
      msg.channel.send(`<a:ezgif6fe79721a2e5d:797412296066072576> you can use me too use command \`${config.prefix}p or ${config.prefix}play\``)
    }
  }
  let dataforlog = cacheforlog[msg.guild.id]
  if (dataforlog === 0) return
  if (!dataforlog) {
    await mongo().then(async (mongoose) => {
      console.log("fetching from mongo for msglogs...")
      try {
        const result = await msglogSchema.findOne({
          _id: msg.guild.id
        })
        if (!result) {
          cacheforlog[msg.guild.id] = dataforlog = 0;
        } else {
          cacheforlog[msg.guild.id] = dataforlog = [result.channelId]
        }

      } finally {
        console.log('cacheforlog ' + msg.guild.name + ' : ' + cacheforlog[msg.guild.id])

        mongoose.connection.close()

      }
    })
  }
  if (!dataforlog) return;
  if (!msg.guild.channels.cache.has(dataforlog[0])) return;
  if (dataforlog[0] === null) return;
  if (!dataforlog[0]) return;
  if (msg.channel.id === dataforlog[0]) return;
  if (msg.guild === null) return;
  if (msg.attachments.size > 0) {
    var Attachment = (msg.attachments).array();
    try {
      const embed = new Discord.MessageEmbed()

        .addField('Attachment url ->', Attachment[0].url)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setColor("RANDOM")

      msg.guild.channels.cache.get(dataforlog[0]).send('👇' + 'Attachment sent at `' + msg.createdAt + '` in ' + '<#' + msg.channel + '>', embed)
    } catch (e) {

    }

  } else {
    if (msg.content.length > 1023) return msg.guild.channels.cache.get(dataforlog[0]).send(msg.content);
    try {
      const embed = new Discord.MessageEmbed()

        .addField(`Message content :`, msg.content)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setColor("RANDOM")

      msg.guild.channels.cache.get(dataforlog[0]).send('👇' + 'Message sent at `' + msg.createdAt + '` in ' + '<#' + msg.channel + '>', embed)
    } catch (e) {

    }
  }

  fs.appendFile(`./sv log files/${msg.guild.id}_LOG.txt`, msg.guild.name + " ---> " + msg.createdAt + ' <--> ' + msg.author.tag + " : " + msg.content + ' in ' + msg.channel.name + "\n\n", (err) => {

    // In case of a error throw err. 
    if (err) throw err;
  })


})


////////////////////////////////////////////////////////////////-------------getsvid----------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getsvid(message) {
  guildgt[message.author.id] = 1
  var inguildsID = [],
    inguildsname = [],
    j = 0
  var allguilds = bot.guilds.cache.map(guild => guild)
  for (var i = 0; i < allguilds.length; i++) {

    if (allguilds[i].members.cache.has(message.author.id)) {

      inguildsID[j] = allguilds[i].id
      inguildsname[j] = eval(j + 1) + '. ' + allguilds[i].name
      j++
    }

  }

  const CChannel = new Discord.MessageEmbed()
    .setTitle('In which server you want to contact choose no. of that server')
    .setColor('#00FFFF')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Choose server number to make a ticket')
    .setDescription('<a:Arrowrgb:797207018200891454>' + inguildsname.join('\n<a:Arrowrgb:797207018200891454>'))

  await message.author.send(CChannel).then(async () => {
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
      time: 40000
    });
    var svtout = setTimeout(() => {

      guildgt[message.author.id] = 0
      message.author.send('<a:giphy:797262158538473553> Time out, you did not select any server, try again!')
      collector.stop()

    }, 40000)
    collector.on('collect', message => {

      if (bot.guilds.cache.has(inguildsID[message.content - 1])) {
        guildgt[message.author.id] = bot.guilds.cache.get(inguildsID[message.content - 1])
        clearTimeout(svtout)
        message.author.send(`Ok you want to contact **${guildgt[message.author.id].name}**, Now you can send your messages`)
        delete inguildsID, inguildsname
        collector.stop()
      } else if ((typeof message.content == 'string' | message.content > inguildsID.length | message.content < 1) && (guildgt[message.author.id] == 0 | guildgt[message.author.id] == 1 | guildgt[message.author.id] == 2)) {
        message.author.send('Please choose the correct server no.')
        guildgt[message.author.id] = 2
      }
    })
  })
}

////////////////////////////////////////////////////------------------------MOD-MAIL--------------------------//////////////////////////////////////////////////////////////////////////////////////
var guildgt = []
created = []
bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.guild === null) {
    if (guildgt[message.author.id] == undefined | created[message.author.id] == undefined) {
      guildgt[message.author.id] = 0
      created[message.author.id] = false
    }
    let active = await db.fetch(`support_${message.author.id}`);

    let channel, found = true;
    try {
      if (active) bot.channels.cache.get(active.channelID).guild;
    } catch (e) {
      found = false;
    }
    if (!active || !found) {
      if (guildgt[message.author.id] == 2) return
      if (guildgt[message.author.id] == 0) return await getsvid(message)
      if (guildgt[message.author.id] == 1) {
        msgtout = setTimeout(() => {
          guildgt[message.author.id] = 0
          message.author.send('<a:giphy:797262158538473553>  Time out, you did not send any message, try again!')
        }, 60000)
      }
      if (guildgt[message.author.id] == 1) return
      // Create Support Channel.
      active = {};
      console.log(guildgt[message.author.id])
      if (!guildgt[message.author.id].members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR")) return message.author.send("<a:nogif:797207020796379158> sorry modmail is off for this server or maybe, I don't have admin permission.")
     
    //if (!permission) return message.author.send("<a:nogif:797207020796379158> sorry modmail is off for this server")
      let dataforRole = cacheforRole[guildgt[message.author.id]]
    if (dataforRole === 0) return 
    if (!dataforRole) {
      await mongo().then(async (mongoose) => {
        console.log("fetching for..."+guildgt[message.author.id])
        try {
          const result = await modmailRoleSchema.findOne({
            _id: guildgt[message.author.id].id
          })
          if (!result) {
            cacheforRole[guildgt[message.author.id].id] = dataforRole = 0;
          } else {
            cacheforRole[guildgt[message.author.id].id] = dataforRole = [result.channelId]
          }

        } finally {
          mongoose.connection.close()
        }
      })
    }
    channel = await guildgt[message.author.id].channels.create(`${message.author.username}-${message.author.discriminator}-by modmail`, "text");
    //channel.setParent('787384073337045012'); 
    channel.setTopic(`~close to close the Ticket | ModMail for ${message.author.tag} | ID: ${message.author.id}`);
    let everyone = guildgt[message.author.id].roles.cache.find(r => r.name === "@" + "everyone");
    await channel.updateOverwrite(everyone, {
      VIEW_CHANNEL: false,
    });
    if (dataforRole[0]!==0 && guildgt[message.author.id].roles.cache.has(dataforRole[0])){
      let modRoles = guildgt[message.author.id].roles.cache.get(dataforRole[0]);          // Find the Mod/Admin roles so only Admin/Mods will see the tickets. Add it in the quotes
      channel.updateOverwrite(modRoles, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        MANAGE_CHANNELS: true
      });
    }
      // This will set the permissions so only Staff will see the ticket.
      let author = message.author;
      const newChannel = new Discord.MessageEmbed()
        .setColor('36393E')
        .setAuthor(author.tag, author.displayAvatarURL())
        .setFooter('ModMail Ticket Created')
        .addField('User', author)
        .addField('ID', author.id);
      await channel.send(newChannel);
      clearTimeout(msgtout)
      const newTicket = new Discord.MessageEmbed()
        .setColor('36393E')
        .setAuthor(`Hello, ${author.tag}`, author.displayAvatarURL())
        .setFooter('ModMail Ticket Created');

      await author.send(newTicket);
      active.channelID = channel.id;
      active.targetID = author.id;
    }

    channel = bot.channels.cache.get(active.channelID);

    const dm = new Discord.MessageEmbed()
      .setColor('36393E')
      .setAuthor(`Thank you, ${message.author.tag}`, message.author.displayAvatarURL())
      .setFooter(`Your message has been sent -- A staff member will be in contact soon.`);

    await message.author.send(dm);

    const embed = new Discord.MessageEmbed()
      .setColor('36393E')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(message.content)
      .setFooter(`Message Recieved -- ${message.author.tag}`);

    await channel.send(embed);

    db.set(`support_${message.author.id}`, active);
    db.set(`supportChannel_${channel.id}`, message.author.id);
    return;

  }

  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
    support = await db.fetch(`support_${support}`);
    let supportUser = bot.users.cache.get(support.targetID);
    if (!supportUser) return message.channel.delete();

    // !complete command
    if (message.content.toLowerCase() === config.prefix + "close") {
      const complete = new Discord.MessageEmbed()
        .setColor('36393E')
        .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL())
        .setFooter('Ticket Closed')
        .setDescription('*Your ModMail has been marked as **Complete**. If you wish to reopen this, or create a new one, please send a message to the bot.*');

      supportUser.send(complete);
      console.log(support.targetID)
      guildgt[support.targetID] = 0
      created[support.targetID] = false
      message.channel.delete()
        .then(console.log(`Support for ${supportUser.tag} has been closed.`))
        .catch(console.error);
      return db.delete(`support_${support.targetID}`);

    }
    const embed = new Discord.MessageEmbed()
      .setColor('36393E')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setFooter(`Message Recieved`)
      .setDescription(message.content);


    bot.users.cache.get(support.targetID).send(embed);
    message.delete({
      timeout: 1000
    });
    embed.setFooter(`Message Sent by -- ${supportUser.tag}`).setDescription(message.content);
    return message.channel.send(embed);
  }




})


/////////////////////////////////////////////////////////////////------------------vc join mb----------------/////////////////////////////////////////////////////




////////////////////////////////////////////////-------------------------to off the bot----------------------------//////////////////////////////////////////////////////////////////////////////////////////////
bot.on("message", async (message) => {
 

  /////////////////////////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////////////////////////////




  if (message.content.toLowerCase() === '~off') {
    if (message.author.id === '437348488846770208') {
    await message.channel.send('Badger.js has stopped working!!!')
    process.exit()
    }
  }
  if (message.guild !== null) {
    fs.appendFile(`./sv log files/LOG.txt`, message.guild.name + " ---> " + message.createdAt + ' <--> ' + message.author.tag + " : " + message.content + ' in ' + message.channel.name + "\n\n", (err) => {
      if (err) throw err;
    })
  }


});




bot.on('voiceStateUpdate', async (oldMember, newMember) => {
  if (newMember.channelID === null && (newMember.id === '609713401777618965' | newMember.id === '742339687259177021')) {
    bot.connection.set(newMember.guild.id, false)
  }
  if (newMember.channelID === null) {
    if (!newMember.guild.voice) return
    conn = newMember.guild.voice.connection
    if (conn) {
      count = conn.channel.members.size;
      if(count==1){
        conn.disconnect()
      }
    }

  }
})











///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////----------RPC-----------------/////////////////////////////////////////////////////////////////////////////////


bot.login(config.token)
