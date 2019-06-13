const d = require('discord.js').RichEmbed;

exports.run = (client, message, args) => {
    if (!args[0] || args[0] !== 'embed') {message.channel.send('🅱')
        .then(msg => {msg.react('🅱')})}
    else if(args[0] === 'embed') {
        const e = new d()
            .setTitle('🅱')
            .setColor('#ff0000')
            .setDescription('🅱')
            .setFooter('🅱')
            .addField('🅱', '🅱')
            .addField('🅱', '🅱');
        message.channel.send(e).then(msg => {msg.react('🅱')})
    }
};

exports.help = {
    "command": "b",
    "aliases": "",
    "description": "🅱",
    "usage": ">🅱 [\"embed\"]"
};