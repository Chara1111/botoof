const d = require('discord.js').RichEmbed

exports.run = (client, message, args) => {
    const embed = new d()
        .setTitle('Info about bot')
        .setColor('#847837')
        .addField('Bot creator', 'dank_meme#0001')
        .setDescription('Maybe you are searching for `>commands`, but if you want **help**, then you came to right place!')
        .addField('I have issues, suggestions, want to look what\'s in new version', 'Issues, suggestions - to dank_meme#0001, `>info` - look info about new version')
    if(!args[0]) return message.channel.send(embed)
    try {
        let cf = require(`./${args[0]}.js`);
        let cmd = cf.help.command;
        let als = cf.help.aliases;
        if (als === '') als = 'none'
        let desc = cf.help.description;
        let usage = cf.help.usage;
        let embed = require('discord.js').RichEmbed
        embed = new embed()
            .setTitle(`Info about \`${cmd}\` command`)
            .setColor('#349347')
            .addField(`Aliases:`, `${als}`)
            .addField('Description:', `${desc}`)
            .addField('Usage:', `${usage}`);
        message.channel.send(embed)
    } catch(e) {
        console.log(e.message);}
};

exports.help = {
    "command": "help",
    "aliases": "",
    "description": "View info about command/about how to use bot",
    "usage": ">help [command]"
};