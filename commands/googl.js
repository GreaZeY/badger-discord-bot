const request = require('node-superfetch');
const Discord = require(`discord.js`);
const tts = require('../tts reply/tts')
exports.run = async (bot, message, args, result) => {
    let query
    if (!result.intent) {
        query = args.join(' ')
        if (!query) return message.channel.send("What should I search, give me something.");
        let embed = await membed(query)
        message.channel.send('Here what i found', embed)
    } else {
        if(bot.connection.get(message.guild.id)){
            query = args.replace(result.parameters.fields.gooquery.stringValue, '').trim() 
        }else{
            query = message.content.replace(result.parameters.fields.gooquery.stringValue, '').trim()
        }
        if (!query) return message.channel.send("What should I search, can you say that again."),tts(bot,message,'What should I search, can you say that again..')
        let embed = await membed(query)
        try {
        } catch (err) {
            console.log(error)
        }
        message.channel.startTyping()
        tts(bot,message,embed.description)
        setTimeout(function () {
            const info = new Discord.MessageEmbed()
                .setDescription(embed.description + ` [Learn more](${embed.url})`)
                .setColor('00FFFF')
            message.reply(info)
            message.channel.stopTyping();
        }, 3000);
        
    }
    async function membed(query) {
        href = await search(query);
        if (!href) return message.channel.send("Unknown search.");
        const embed = new Discord.MessageEmbed()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
            .setURL(href.link)
            .setColor('00FFFF')
            .setFooter(`search result for ${query}`)
        return embed;
    }
    async function search(query) {
        
        const {
            body
        } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: process.env.google_Key,
            cx: process.env.google_csx,
            safe: "off",
            q: query
            
        });
        if (!body.items) return null;
        return body.items[0];

    }
}
module.exports.help = {
    name: "google"
}