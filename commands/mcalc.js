let discord = require("discord.js");

exports.run = (client, message, args) => {
    let askver = new discord.RichEmbed()
        .setTitle(':one: Please choose version')
        .setColor('#4843ff')
        .setDescription('Just type in chat 1 or 2. 1 is for Java Edition, 2 is for Bedrock Edition');
    filter = msg => msg.content === '2' || msg.content === '1'
    message.channel.awaitMessages(filter).then(collected => {
        message.channel.send(collected)
    })
};