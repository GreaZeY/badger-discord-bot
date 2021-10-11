const redditImageFetcher = require('reddit-image-fetcher')
const Discord = require('discord.js')
module.exports.run = async (bot, message) => {
await redditImageFetcher.fetch({
    type: 'meme',
    total: 50, 
    addSubreddit: ['memes', 'funny'], 
   // removeSubreddit: ['dankmemes']
}).then(result=>{
    var random = Math.floor((Math.random() * 50) + 0);
    let embedpic = new Discord.MessageEmbed()
    .setImage(result[random].image)
    .setColor('36393E')
message.channel.send(embedpic)
})

}
module.exports.help = {
    name: ['meme','memes']
}