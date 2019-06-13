const discord = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new discord.RichEmbed()
        .setTitle(`Suggestion by ${message.author.tag}`)
        .setColor('#00ffff')
        .setFooter('React to upvote reaction to upvote this suggestion. React downvote one to downvote')
        .setDescription(args.join(' '));
    message.channel.send(embed).then(msg => {msg.react('⬆');
    msg.react('⬇')})
};

exports.help = {
    "command": "suggest",
    "aliases": "",
    "description": "Suggest suggestion",
    "usage": ">suggest <suggestion text>"
};