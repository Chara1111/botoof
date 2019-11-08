let discord = require("discord.js");

exports.run = (client, message, args) => {
    let askver = new discord.RichEmbed()
        .setTitle(':one: Please choose version')
        .setColor('#4843ff')
        .setDescription('Just type in chat 1 or 2. 1 is for Java Edition, 2 is for Bedrock Edition');
    message.channel.send(askver);
    filter = response => {return response.author === message.author && (response.content === '1' || response.content === '2')};
    message.channel.awaitMessages(filter, { time: 10000, errors: ["time"] }).then(collected => {
        if(collected.first().content === '1') {
            // Java edition calculator

        }
        else if(collected.first().content === '2') {
            // Bedrock edition calculator
        }
                }).catch(collected => {message.channel.send("Looks like you forgot about me... Try run command again and respond faster this time.")})

};