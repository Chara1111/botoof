exports.run = (client, message, args) => {
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.3')
        .setDescription('Version 1.0.3 =>' +
        '\n**ok this update is more fix than more content addition**' +
        '\n> the `>mute` command now cannot mute person who has same highest role as you, or above' +
        '\n> the `>addrole` and `>removerole` commands now can be used only by people with manage roles permission (duh)' +
        '\n> the `>ban` command cannot ban user whos highest role is above or equal your, but better not to test Bianca' +
        '\n> ^ same with `>kick`' +
        '\n> `>kick` command now dms user with reason why he was kicked' +
        '\n> ^ same with `>ban`' +
        '\n> `>ban` now shows also why user was banned with reason in chat, not just "tag was successfully banned"' +
        '\n> ^ same with `>kick`' +
        '\n> fixed when sometimes user join, this embed in welcome doesnt appearing, because bot cant get how many times invite was used' +
        '\ny u read this')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};