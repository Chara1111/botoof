let discord = require("discord.js");

exports.ready = () => {
    console.log("Logger is working :pepevil:")
};

exports.log = (client, message) => {
    let channel = client.channels.get('609007948022153228');
    let embedmsg = new discord.RichEmbed()
        .setTitle("New message")
        .setDescription(`Guild: ${message.guild.name}. Channel: <#${message.channel.id}>, Channel ID: ${message.channel.id}`)
        .setThumbnail(message.guild.iconURL)
        .addField('Message sender', `Tag: ${message.author.tag}, ID: ${message.author.id}`)
        .addField('Message content', message.content)
        .setColor('#65ff27')
        .setFooter('Time: ' + message.createdAt);
    channel.send(embedmsg)
};