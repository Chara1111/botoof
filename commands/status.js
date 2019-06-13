const discord = require('discord.js');

exports.run = (client, message, args) => {
    let msgid = '583992363337383953'
    const embed = new discord.RichEmbed()
        .setTitle('Current status of bot')
        .setDescription('not set yet')
        .setColor('#505050')
        .setFooter('bot created by dank_memeﱟ#0001 ');
    if (message.author.id !== '427007456502218752') return message.reply('You cannot use this command.');
    if(args[0] === 'message') {
    message.channel.send(embed)}
    if(args[0] === 'online') {message.channel.fetchMessages({around: `${msgid}`, limit: 1})
        .then(messages => {embed.setDescription('<:online:583708835554787345> Bot is currently online!');
            embed.setColor('#54ff54');
            message.delete();
            messages.first().edit(embed)})}
    if(args[0] === 'offline'){message.channel.fetchMessages({around: `${msgid}`, limit: 1})
        .then(messages => {embed.setDescription('<:offline:583708946209177630> Bot is currentrly offline');
            embed.setColor('#ff0000');
            message.delete();
            messages.first().edit(embed)})}
    if(args[0] === 'reboot') {message.channel.fetchMessages({around: `${msgid}`, limit: 1})
        .then(messages => {embed.setDescription('<:reboot:583708907432574978> Bot can be unavailable');
            embed.setColor('#fff000');
            message.delete();
            messages.first().edit(embed)})}
    if(args[0] === 'update') {message.channel.fetchMessages({around: `${msgid}`, limit: 1})
        .then(messages => {embed.setDescription('<:update2:585925351562018816> Bot just was updated!');
            embed.setColor('#656bff');
            message.delete();
            messages.first().edit(embed)})}
    };