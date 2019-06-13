const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
    let mrs = JSON.parse(fs.readFileSync("./configs/muteroles.json", "utf8"));
    let mr = mrs[message.guild.id];
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To mute members, you need to have manage channels permission!');
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed);
    if(isNaN(mr) || mr === undefined) return message.channel.send('<:cross:584800355951443968> Oops, it seems like this server has no mute role set. Set one using >muterole');
    message.guild.members.get(message.mentions.users.first().id).removeRole(mr);
    message.channel.send(`<:tick:584800524000296971> Successfully unmuted ${message.mentions.users.first().tag}`)
};

exports.help = {
    "command": "unmute",
    "aliases": "",
    "description": "Unmute provided member. Must be set mute role firstly (using >muterole)",
    "usage": ">unmute <mention>"
};