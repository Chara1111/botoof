exports.run = (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.6')
        .setDescription('Version 1.0.6 =>' +
        '\n**yes**' +
        '\n> thanks for everyone who paid respects to rodog with `>f`, now pay respects to Banana, his nitro expired' +
        '\n> added the >giveaway end thing to end giveaway before time ends'+
        '\n> automod no more triggers you if you say minigame or word which contain niga, also nige, so Nigeria is allowed now' +
        '\n> `>cmds` command now is so nice' +
        '\n> deleted useless `>prefix` command for now, because you can\'t change prefix anymore' +
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