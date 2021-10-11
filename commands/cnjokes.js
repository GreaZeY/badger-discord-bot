const joke = require('discord-jokes')
module.exports.run = async (bot, message) => {
joke.getRandomCNJoke (function(joke) {
    message.channel.send(joke)
});

}
module.exports.help = {
  name: "cnjoke"
}
