const discord = require('discord.js');

exports.run = (client, message, args) => {
    let mr = '570611175407222794';
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To mute members, you need to have manage channels permission!');
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed);
    if(message.member.highestRole.comparePositionTo(message.guild.members.get(message.mentions.users.first().id).highestRole) < 0) return message.channel.send('<:cross:584800355951443968> lmfao dont try to mute person with ur role or above u');
    message.guild.members.get(message.mentions.users.first().id).removeRole(mr)
        .then(() => {message.channel.send(`<:tick:584800524000296971> Successfully unmuted ${message.mentions.users.first().tag}`)})
        .catch(() => {message.channel.send("Couldn't unmute this user!")});

};

exports.help = {
    "command": "unmute",
    "aliases": "",
    "description": "Unmute provided member.",
    "usage": ">unmute <mention>"
};