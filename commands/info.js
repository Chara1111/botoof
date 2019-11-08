exports.run = (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.8')
        .setDescription('Version 1.0.8 =>' +
        '\n**i wanna sleep**' +
        '\n> some commands have been deleted (check >cmds)' +
        '\n> fixed some bugs with >cmds'+
        '\n> boi fixed >ban and >kick' +
        '\n> awesome command >translate (example in >cmds -> regular commands)' +
        '\n> some checks so you cant use some of commands in main chat, to not flood it' +
        '\n> `>addrole` and `>removerole` now can be used with id or mention <:awoo:594258019433578508>' +
        '\n> you can now set time for `>mute` command')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};