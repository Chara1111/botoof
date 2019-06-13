const RichEmbed = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new RichEmbed.RichEmbed()
        .setTitle('Pong!')
        .setColor('#1010FF')
        .setFooter('bot created by dank_meme#0001')
        .addField('Client ping', '`' + Math.round(client.ping) + '` ms');
    message.channel.send(embed)
        .then((msg) => { // Resolve promise
            let ping = Date.now() / 1000;
            let crtd = msg.createdTimestamp / 1000;
            ping -= crtd;
            embed.addField('Response ping', '`' + Math.floor(ping) + '` ms');
            msg.edit(embed);// Edits message with current timestamp minus timestamp of message
            msg.react('🏓')
        })
};

exports.help = {
    "command": "ping",
    "aliases": "",
    "description": "View bots ping",
    "usage": ">ping"
};