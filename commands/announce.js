const discord = require('discord.js');

exports.run = (client, message, args) => {
    let text = args.join(' ');
    let embed2 = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To do announcements, you need to have manage messages permission!');
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed2);

    const embed = new discord.RichEmbed()
        .setTitle('A little announcement by ' + message.author.tag + '!')
        .setColor('0x0000FF')
        .setThumbnail(message.author.avatarURL)
        .setFooter('bot created by dank_meme#0001')
        .setDescription(text);
    message.channel.send(embed)
        .then(function (message) {
            message.react('⬆');
        message.react('🎉');
        message.react('🤔');
        message.react('⬇')})
};

exports.help = {
    "command": "announce",
    "aliases": "ann",
    "description": "Announce something in current channel",
    "usage": ">announcement <announcement text>"
};

