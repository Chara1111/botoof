exports.run = (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    const emb = require('discord.js').RichEmbed;
    const embed = new emb()
        .setTitle('Current version 1.0.8')
        .setDescription('Version 1.0.8 =>' +
        '\n**boi birthday command was without errors first time I runned it**' +
        '\n> `>bday` command! (Warning: it doesnt show real birthday, but acoount birthday)' +
        '\n> `>coinflip` is new command too.'+
        '\n> Secret command is being worked! Coming soon...' +
        '\n> Minecraft command is being worked too. Stay tuned.' +
        '\nTell me thanks for releasing update right now and not after I will done making 2 commands above')
        .setColor('#477383');
    message.channel.send(embed)
};

exports.help = {
    "command": "info",
    "aliases": "",
    "description": "View info about current version of bot",
    "usage": ">info"
};