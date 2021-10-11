const {MessageEmbed} = require('discord.js')
const {
  prefix
} = require('../config.json')
var hmsg = {},
  c = {}
module.exports.run = async (bot, message, _, result) => {
  if (result.intent) intent = result.intent.displayName;
  else intent = null
  
  const helpembed = new MessageEmbed()
    .setDescription(`**${bot.user.username} Bot commands Help, Prefix is \`${prefix}\` (tilde)**`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}mmhelp\``, 'To get help about Modmail Feature')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}welhelp\``, 'To get help about welcome message feature of this bot')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}musichelp\``, 'To get all the commands of music player')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}chatbothelp\``, 'To get help about chatbot feature of this bot.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}funhelp\``, 'To get some fun commands.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}mischelp\``, 'To get some other useful commands.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}help or ${prefix}h\``, 'It will send you all commands of this Bot.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}about\``, 'Information about BOT')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}ping\``, 'To check the ping')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}vchat\``, 'To use voice based user ineraction with badger')
    .setFooter("React on message to navigate through pages")
    .setColor("RANDOM")

  const musicembed = new MessageEmbed()
    .setDescription(`**${bot.user.username} Bot's Music commands List, Prefix is \`${prefix}\` (tilde)**`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}play or ${prefix}p\``, 'play music through this command use name or link anything you want.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}q or ${prefix}queue\``, "will give you, your server's Queue.")
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}loop\``, 'set currently playing song  on loop, can be use to toggle enable or disable loop.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}loopqueue or ${prefix}lq\``, 'set your whole queue on loop, can be use to toggle enable or disable loop.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}nowplaying or ${prefix}np\``, 'Will tell what song is playing currently.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}pause\``, 'To pause the song.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}resume or ${prefix}res\``, 'To resume the song.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}skip\``, 'To skip the current track.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}back\``, 'To go back to the previous track.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}remove or ${prefix}r\``, `To remove any given track from queue e.g. ${prefix}r <track_no.>.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}clearqueue or ${prefix}cq\``, 'To clear the whole server queue.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}stop\``, 'As per the name it will stop the bot from playing.')
    .setColor("RANDOM")

  const funembed = new MessageEmbed()
    .setDescription(`**${bot.user.username} Bot's Fun commands List, Prefix is \`${prefix}\` (tilde)**`)
    .addField(`\`${prefix}whowouldwin\``, 'Use this command to see who wins a duel between two mentioned users e.g. `~whowouldwin` <@1st_mention> <@2nd_mention>')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}mimic\``, '    Bot will join voice channel and will start mimic you anything that you will say bot will repeat after you.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}joke\``, `    Get a random joke on anything need arguments e.g. ${prefix}jokeon hollywood.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}cnjoke\``, '    Get a random Chuck Norris joke.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}dadjoke\``, '    Get a random dad joke.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}jokeon\``, `    Get a random joke on person, need arguments firstname lastname e.g. ${prefix}jokeon badger bot`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}batslap\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}wanted\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}glitch\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}memcard\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}ps4\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}crush\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}approved\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}vs\``, 'Tag two challengers or tag yourself as challenger')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}challenger\``, 'Tag your challenger')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}fire\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}tatoo\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}scary\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}rejected\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}rip\``, 'Tag anyone with this command and see what happens')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}crush\``, 'Tag anyone with this command and see what happens')
    .setFooter("********************************* Now say thanks to me 😊 *********************************")
    .setColor("RANDOM")

  const chatbotembed = new MessageEmbed()
    .setDescription("**About Chat BOT Feature**")
    .addField('**Chat BOT** ', "It's as yet in Developing stage yet trust me its truly fascinating when your discord members come to converse with this bot and this bot answer to thier queries so attempt it.")
    .addField(`\`${prefix}aibotchan\``, `To set the channel where user can talk to ${bot.user.username}. \`${prefix}aibotchan <#channel>\``)
    .addField(`\u200B`, '════════════════════════SKILLS════════════════════════')
    .addField(`Small talks`, `Your Discord members can have fun with some small talks to this bot.`)
    .addField(`Google Searches`, `You can ask him like who is Lana Rhodes it will tell you who she is or like do a google search on <anything you want> try it.`)
    .addField(`Play Music`, `Will play music for you just say **play shiki senpai** or can you play <any song you want>.`)
    .addField(`Jokes`, `Will tell you a joke just say **tell me a joke**.`)
    .addField(`Make a Jokes on`, `Will make a joke on a person name or anything you say like **make a joke on brad pitt**.`)
    .addField(`Temperature`, `Will tell you current temperature of given city say **what is the current temperature of New York**.`)
    .addField(`Dictonary`, `Will tell you meaning of given word juist say **what is the meaning of water**.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}vchat\``, 'To use same feature but in voice based user ineraction, but say slowly and one user at a time otherwise it does not understand it properly.')
    .setFooter('In Future will increase its Feature to entertain members')
    .setColor("RANDOM")

  const miscembed = new MessageEmbed()
    .setDescription(`**${bot.user.username} Bot's Miscellaneous commands List, Prefix is \`${prefix}\` (tilde)**`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}calc\``, '   Who dont do Maths.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}av or ${prefix}avatar\``, '    Displays your Avatar or if user is mentioned then it will displays his avatar.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}join\``, '    Bot will join voice channel.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}img\``, `    Bot will send a random image og given entity e.g. ${prefix}img train then it will give you a image of train.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}meme\``, '    Bot will give you random meme.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}leave\``, '    Bot will leave voice channel.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}say\``, '    Text-to-speech Feature bot will say anything you want.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}welchan\``, `    Set your welcome channel. e.g. ${prefix}welchan #<channel_name>`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}msglogs\``, `    Set your message log channel. e.g. ${prefix}msglogs #<channel_name>`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}temperature\``, 'Will tell you the temperature of given city')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}dict\``, 'Will tell you the meaning of given word')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}logs\``, '    You will recieve a log file of server.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}cls\``, '    Deletes the specified no. of chats.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}addrole\``, `    For giving a specified Role to mentioned user  e.g. ${prefix}addrole @mention role_name.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}info\``, `    It will returns all the information about mentioned person e.g. ${prefix}info @mention`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}announce\``, `    Announce anything what you want. e.g. ${prefix}announce #channel_name msg_content`)
    .setColor("RANDOM")

  const mmembed = new MessageEmbed()
    .setDescription("**About Modmail**")
    .addField('**Modmail** ', 'ModMail is a feature designed to enable your server members to contact staff easily. A new channel is created whenever a user messages the bot, and the channel will serve as a shared inbox for seamless communication between staff and the user.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}setstaff\``, 'To set the staff role so, that only your staff can see the modmail ticket for users and help them.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}close\``, 'To close the modmail ticket for a user.')
    .setColor("RANDOM")

  const welembed = new MessageEmbed()
    .setDescription("**About Welcome Message Feature**")
    .addField('**Welcome Message** ', 'This will send a **Heart-warming welcome message** whenever a new member joins your server.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}welchan\``, `Set your welcome message channel by using this command e.g. \`${prefix}welchan <#channel-name> text\` where 'text' is the welcome messgae which will be send to welcome channel and **wherever in your welcome message you wamt to tag joined member just type <member> in that place**.`)
    .addField('***Example***', `${prefix}welchan #welcome welcome to the server **member** read rules in #rules. Your welcome message will look like this.`)
    .setImage('https://cdn.discordapp.com/attachments/727501247875252389/797494859236638733/unknown.png')
    .setColor("RANDOM")

  const msglogmbed = new MessageEmbed()
    .setDescription("**About Message Logs Feature**")
    .addField('**Message Logs** ', 'This will keep Logs of messages sent in your server.')
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}msglogs\``, `Set your message logs channel by using this command e.g. \`${prefix}msglogs <#channel-name>\`.`)
    .setColor("RANDOM")
 const animembed = new MessageEmbed()
    .setDescription("**Anime**")
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}anime\``, `will give you a random anime image.`)
    .addField(`<a:Arrowrgb:797207018200891454> \`${prefix}hentai\``, `will give you a random nsfw anime image, nsfw must be enabled for channel.`)
    .setColor("RANDOM")
  if (message.content.toLowerCase() === prefix + 'help' | message.content.toLowerCase() === prefix + 'h' | intent === 'help') {
    help()
  }
  if (message.content.toLowerCase() === prefix + 'mmhelp') {
    message.author.send(mmembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'welhelp') {
    message.author.send(welembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'chatbothelp') {
    message.author.send(chatbotembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'mischelp') {
    message.author.send(miscembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'musichelp') {
    message.author.send(musicembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'funhelp') {
    message.author.send(funembed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'msgloghelp') {
    message.author.send(msglogmbed)
    message.channel.send('Check your DM.')
  }
  if (message.content.toLowerCase() === prefix + 'animehelp') {
    message.author.send(animembed)
    message.channel.send('Check your DM.')
  }
  async function help() {

    message.channel.send("Check your DM, I have sent you the whole list of commands.")
    c[message.author.id] = 0
    await message.author.send(helpembed).then(msg => {
      hmsg[message.author.id] = msg
      msg.react('<a:nextarrow:801503614286954526>')
    })


    const filter = (reaction, user) => {
      return (reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && user.id === message.author.id;
    };

    async function react() {
      const collector = hmsg[message.author.id].createReactionCollector(filter, {
        time: 60000
      });
      collector.on('collect', (reaction, user) => {
        if (c[user.id] >= 0 && c[user.id] <= 8) reaction.emoji.name === 'nextarrow' ? c[user.id]++ : c[user.id]--;

        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 0) {
          hmsg[user.id].delete()
          message.author.send(helpembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }

        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 1) {
          hmsg[user.id].delete()
          message.author.send(mmembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 2) {
          hmsg[user.id].delete()
          message.author.send(welembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 3) {
          hmsg[user.id].delete()
          message.author.send(musicembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 4) {
          hmsg[user.id].delete()
          message.author.send(chatbotembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 5) {
          hmsg[user.id].delete()
          message.author.send(funembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 6) {
          hmsg[user.id].delete()
          message.author.send(msglogmbed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')
          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 7) {
          hmsg[user.id].delete()
          message.author.send(miscembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
            msg.react('<a:nextarrow:801503614286954526>')

          })
        }
        if ((reaction.emoji.name === 'nextarrow' | reaction.emoji.name === 'backarrow') && c[user.id] == 8) {
          hmsg[user.id].delete()
          message.author.send(animembed).then(msg => {
            hmsg[user.id] = msg
            collector.stop()
            react()
            msg.react('<a:backarrow:801503615122014259>')
          })
        }



      });
    }

    react()


  }


}
module.exports.help = {
  name: ['help', 'h', 'welhelp', 'musichelp', 'mischelp', 'funhelp', 'chatbothelp', 'mmhelp','msgloghelp']
}
