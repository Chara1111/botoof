let discord = require("discord.js");

exports.run = (client, message, args) => {
    let askver = new discord.RichEmbed()
        .setTitle(':one: Please choose version')
        .setColor('#4843ff')
        .setFooter('Command ran by ' + message.author.tag)
        .setDescription('Just type in chat 1 or 2. 1 is for Java Edition, 2 is for Bedrock Edition');
    message.channel.send(askver);
    const filter = response => {return response.author === message.author && (response.content === '1' || response.content === '2')};
    message.channel.awaitMessages(filter, { time: 10000, errors: ["time"] }).then(collected => {
        if(collected.first().content === '1') {
            // Java edition calculator
            let jcalc = new discord.RichEmbed()
                .setTitle('Minecraft Calculator')
                .setFooter('Command ran by ' + message.author.tag)
                .setColor('#34ff81')
                .setDescription('Just type following number of what you want to calculate in chat.')
                .addField(':one: Sharpness', 'Calculate damage with some level')
                .addField(':two: Jump boost', 'Calculate jump height with some level')
                .addField(':three: Fire aspect', 'Calculates fire damage with some level')
                .addField(':four: Protection', 'Calculates % of damage absorb with some level')
                .addField(':five: Unbreaking(armor)', 'Calculates % chance of armor not getting damaged')
                .addField(':six: Unbreaking(not armor)', 'Calculates % chance of item not getting damaged');
            message.channel.send(jcalc);
            filter2 = response => {return response.author === message.author && (response.content === '1' || response.content === '2' || response.content === '3' || response.content === '4' || response.content === '5' || response.content === '6')};
            message.channel.awaitMessages(filter, { time: 40000, errors: ["time"] }).then(collected => {
                if(collected.first().content === '1') {}
                else if(collected.first().content === '2') {}
                else if(collected.first().content === '3') {}
                else if(collected.first().content === '4') {}
                else if(collected.first().content === '5') {}
                else if(collected.first().content === '6') {}
            }).catch(collected => {message.channel.send("Looks like you forgot about me... Try run command again and respond faster this time.")})
        }
        else if(collected.first().content === '2') {
            // Bedrock edition calculator

        }
                }).catch(collected => {message.channel.send("Looks like you forgot about me... Try run command again and respond faster this time.")})

};