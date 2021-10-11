const Joke = require('awesome-dev-jokes');
module.exports.run = async (bot, message) => {
  try{
    joke = Joke.getRandomJoke()
    message.channel.send(joke)
  }
  catch(error){
    console.log(error)
  }
  
return joke
}
module.exports.help = {
  name: "joke"
}
