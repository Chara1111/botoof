const ds = require('discord.js');
exports.run = (client, message, args) => {
    let member = message.mentions.users.first();
    const embed1 = new ds.RichEmbed()
        .setTitle(`Your avatar`)
        .setImage(message.author.avatarURL)
        .setFooter('bot created by dank_meme#0001');
    if(!args[0]) return message.channel.send(embed1);
    const embed = new ds.RichEmbed()
        .setTitle(`${member.tag} avatar`)
        .setImage(member.avatarURL)
        .setFooter('bot created by dank_meme#0001');
    message.channel.send(embed)
};

exports.help = {
    "command": "avatar",
    "aliases": "av",
    "description": "Shows your avatar(or another users if given)",
    "usage": ">avatar [user]"
};