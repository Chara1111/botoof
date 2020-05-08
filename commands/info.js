exports.run = (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.9')
        .setDescription('Version 1.0.9 =>' +
        '\nChangelog is gone (i meant it would be here in next version)')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};
