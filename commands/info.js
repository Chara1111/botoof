exports.run = (client, message, args) => {
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.2')
        .setDescription('Version 1.0.2 =>' +
        '\n**yay my owner lazebones finally did something**' +
        '\n> dice rolls (>dice "number of sides")' +
        '\n> premium system is done' +
        '\n> `>mute, >unmute, >muterole` commands added' +
        '\n> added the `>help [command] thingy to some of commands' +
        '\n> added the `>flex` command to joke on your non-nitro friends <:pepevil:587587126577725440>' +
        '\n> added the `>addrole`, `>removerole` commands ***yay***' +
        '\n> added the `>count` command, its amazing!' +
        '\n> small things for zroll official' +
        '\n> more advanced the `>userinfo` command' +
        '\n> woooosh' +
        '\n> Siiiiimon saaaays system! ***aye dont try to use it it can only be used by me (beta test)*** <:Xd:588473272124047370>')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};