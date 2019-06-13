const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
    let srv = message.guild;
    let goal = JSON.parse(fs.readFileSync("./configs/goals.json", "utf8"))[message.guild.id].members;
    const embed = new discord.RichEmbed()
        .setThumbnail(message.guild.iconURL)
        .setTitle('Server info')
        .setColor('#f87fb4')
        .addField('Name', srv.name)
        .addField('Owner', srv.owner)
        .addField('Region', srv.region)
        .addField('AFK channel', srv.afkChannel)
        .addField('AFK timeout', srv.afkTimeout)
        .addField('Created at', srv.createdAt)
        .addField('Default message notifications', srv.defaultMessageNotifications)
        .addField('Server ID', srv.id)
        .addField('Is server large? (having more than 250 members)', srv.large)
        .addField('Member goal', `${srv.memberCount}` + '/' + goal)
        .addField('System messages channel', srv.systemChannel);
    message.channel.send(embed)
};

exports.help = {
    "command": "serverinfo",
    "aliases": "si",
    "description": "View some info about server",
    "usage": ">serverinfo"
};