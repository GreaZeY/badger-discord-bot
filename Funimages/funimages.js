const ameClient = require("amethyste-api")
const {
    prefix
} = require('../config.json')

const ameApi = new ameClient(process.env.amethyste)
module.exports = async (bot, Discord) => {



    bot.on("message", async function (message) {

        if (message.guild === null) return;
        if (message.author.bot) return;
        if (!message.content.toLowerCase().startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();





        if (command === 'glitch') {
            ameApi.generate("glitch", {
                "url": message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            })
        }

        if (command === 'approved') {
            ameApi.generate("approved", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'challenger') {
            ameApi.generate("challenger", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'fire') {
            ameApi.generate("fire", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }

        if (command === 'ps4') {
            ameApi.generate("ps4", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                console.log(image)
                
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'wanted') {
            ameApi.generate("wanted", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        if (command === 'tatoo') {
            ameApi.generate("utatoo", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'scary') {
            ameApi.generate("scary", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'rip') {
            ameApi.generate("rip", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        
        if (command === 'rejected') {
            ameApi.generate("rejected", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }
        if (command === 'batslap') {
            let userArray = message.mentions.users.array();
            if (userArray.length == 0) return message.reply('Who will slap who, mention atleast one user!')
            ameApi.generate("batslap", {
                url: userArray[0].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }),
                avatar: userArray[1] ? userArray[1].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }

        if (command === 'crush') {
            ameApi.generate("crush", {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }



        if (command === 'vs') {
            let userArray = message.mentions.users.array();
            if (userArray.length == 0) return message.reply('Who will vs who, mention atleast one user!')
            ameApi.generate("vs", {
                type: 3,
                url: userArray[0].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }),
                avatar: userArray[1] ? userArray[1].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(image => {
                message.channel.send({
                    files: [image]
                })
            }).catch(err => {
                throw err;
            });
        }


        if (command === 'whowouldwin') {
            let userArray = message.mentions.users.array();
            if (userArray.length == 0) return message.reply('At least mention one user')
            ameApi.generate("whowouldwin", {
                url: userArray[0].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }),
                avatar: userArray[1] ? userArray[1].displayAvatarURL({
                    format: 'png',
                    size: 2048
                }) : message.author.displayAvatarURL({
                    format: 'png',
                    size: 2048
                })
            }).then(async image => {
                await message.channel.send({
                    files: [image]
                })
            }).then(() => {
                if (Math.floor(Math.random() * 10) > 5) {
                    r = 1
                } else {
                    r = 0
                }
                if (userArray.length == 1) {
                    userArray[1] = message.author
                }
                let actions = [':punch:', ':boxing_glove:','<a:ezgif3c12f2db3fea0:797269779786367026>','<a:ezgif3e8de93fc49a8:797269780108935198>','<a:fightpunch:797269782578855996>','<a:muskick:797269779454492712>' ,'<a:punc1h:797269779408748594>', ':boxing_glove:','<a:ezgif38f1012863db6:797269781592932424>',':left_facing_fist:', ':leg:', ':fist:', '<a:kidck:797269783006412801>']

                message.channel.send(`---------**A Fight between ${userArray[0].username} and ${userArray[1].username} has begun**---------`)
                message.channel.send(userArray[r].username + actions[Math.floor(Math.random() * actions.length)] + userArray[r==0?1:0].username).then(message => {



                    for (let i = 0; i < 25; i++) {
                        setTimeout(() => {
                            if (Math.floor(Math.random() * 9) > 5) {
                                r = 1
                            } else {
                                r = 0
                            }
                            ra = Math.floor(Math.random() * actions.length)
                            message.edit(`${userArray[r==0?1:0].username} ${actions[ra]} ${userArray[r].username}`)
                        }, 5000)

                    }

                    setTimeout(() => {
                        message.channel.send(userArray[r].tag + ' landed a final blow and won :partying_face:')
                    }, 40000)


                }).catch(err => {
                    throw err;
                })

            })
        }



       










        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    });





}