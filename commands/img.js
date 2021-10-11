
const Discord = require('discord.js')
const redditImageFetcher = require('reddit-image-fetcher')
module.exports.run = async (bot, message, args, result) => {
    if (!result.intent) {
        
     query = args.join(' ').trim()
    } else {
        query = message.content.replace(result.parameters.fields.imgquery.stringValue, '').trim()
    }

    if (!query) return message.channel.send('Images for what, can you say that again!')
    loading = [`<a:lllb:680558844144779484>`,`<a:ll:797284149911093258>`,`<a:lll:797284769129037864>`]
    message.channel.send(loading[Math.floor(Math.random()*(loading.length-1))])
    await redditImageFetcher.fetch({
        type: 'custom',
        total: 50, 
        subreddit: [query] 
    }).then(result=>{
        var random = Math.floor((Math.random() * 50) + 0);
        if(result[random].NSFW==true){
            if (message.channel.nsfw) {
        let embedpic = new Discord.MessageEmbed()
        .setImage(result[random].image)
        .setColor('36393E')
    message.channel.send(embedpic)
            }else{
                message.channel.send('`nsfw` is disabled for this channel.')
            }
        }else{
            let embedpic = new Discord.MessageEmbed()
        .setImage(result[random].image)
        .setColor('36393E')
    message.channel.send(embedpic)

        }
    
    })




}
module.exports.help = {
    name: ['img','image']
}
