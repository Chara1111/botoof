exports.run = (client, message, args) => {
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.4')
        .setDescription('Version 1.0.4 =>' +
        '\n**contest ended hype**' +
        '\n> oof no currency lets pay respects using the `>f` command' +
        '\n> added the `>uptime` command to view bot uptime' +
        '\n> these commands were deleted due to uselessness after this update: `>welmsg`, `>goal`' +
        '\n> removed member goal' +
        '\n> you cannot roll `>dice` with negative number of sides + now there cannot be zero + need to be whole number' +
        '\n> bot now change status every 10 seconds (possible are: version v1.0.x; Contest ended...; x users (count of users on all servres bot in))' +
        '\n> `>count` command now has limit of one day' +
        '\n> ^ same with `>kick`')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};