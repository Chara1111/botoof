const discord = require('discord.js');

exports.run = (client, message, args) => {
    let member = message.author;
    let user = message.member
    const embed = new discord.RichEmbed()
        .setTitle(`${member.tag}'s info`)
        .setThumbnail(member.avatarURL)
        .setColor('#36410a')
        .addField('Bot', member.bot)
        .addField('Created at', member.createdAt)
        .addField('User ID', member.id)
        .addField('Discord tag', member.tag)
        .addField('Nickname on this server', user.nickname)
        .addField('Hoisted role', user.hoistRole)
        .addField('Joined at', user.joinedAt)
        .addField('Server deafened? (in vc)', user.serverDeaf)
        .addField('Server muted? (in vc)', user.serverMute);
    if(!args[0]) return message.channel.send(embed);
    let member1 = message.mentions.users.first();
    let user1 = message.guild.members.get(message.mentions.users.first().id)
    if (member1 === undefined) return message.reply('Please provide a valid user with mention!')
    const embed1 = new discord.RichEmbed()
        .setTitle(`${member1.tag}'s info`)
        .setThumbnail(member1.avatarURL)
        .setColor('#36410a')
        .addField('Bot', member1.bot)
        .addField('Created at', member1.createdAt)
        .addField('User ID', member1.id)
        .addField('Discord tag', member1.tag)
        .addField('Nickname on this server', user1.nickname)
        .addField('Hoisted role', user1.hoistRole)
        .addField('Joined at', user1.joinedAt)
        .addField('Server deafened? (in vc)', user1.serverDeaf)
        .addField('Server muted? (in vc)', user1.serverMute);
    message.channel.send(embed1)

};

exports.help = {
    "command": "userinfo",
    "aliases": "ui",
    "description": "View some info about provided user, or about you if user not given",
    "usage": ">userinfo [user]"
};