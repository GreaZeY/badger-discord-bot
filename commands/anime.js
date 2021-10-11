const randomanime = require('random-anime')
const {
    prefix
  } = require('../config.json')
module.exports.run = async (bot, message) => {

if(message.content.toLowerCase()===prefix+'anime'){
    const anime = randomanime.anime()
    message.channel.send(anime)
}
if(message.content.toLowerCase()===prefix+'hentai'){
    if (message.channel.nsfw) {
    const nsfw = randomanime.nsfw()
    message.channel.send(nsfw)
    }else{
        message.channel.send('`nsfw` is disabled for this channel.')
    }
}

    
    
}
module.exports.help = {
  name: ['anime','hentai']
}