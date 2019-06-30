exports.run = (client, message, args) => {
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.5')
        .setDescription('Version 1.0.5 =>' +
        '\n**ok**' +
        '\n> thanks everyone who paid respects to currency using `>f` command' +
        '\n> now you pay respects to RoDog, because he was demoted :( or be beaned'+
        '\n> added automod' +
        '\n> added giveaways 🎉' +
        '\n> hopefully those things above good working' +
        '\n> added `>gp` command to do cool giveaway ping :cool: <:awoo:594258019433578508>')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};