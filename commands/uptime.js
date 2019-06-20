exports.run = async(client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = Math.floor(seconds);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let embed = require('discord.js').RichEmbed;
    let emb = new embed()
        .setTitle('Bot uptime is...')
        .setColor('#9999f1')
        .setDescription(uptime);
    message.channel.send(emb)
};