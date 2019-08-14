let discord = require("discord.js");

exports.ready = () => {
    console.log("Logger is working :pepevil:")
};

exports.botlog = (client, event) => {
    let channel = client.channels.get('609674596697767967');

    if(event === 'ready') {
        channel.send('The bot is ready!')
    }

    if(event === 'check') {
        channel.send('Activity check')
    }


};

exports.statuslog = (client, status) => {
    let channel = client.channels.get('609674787203055618');
    channel.send('Changed bot status to ' + status)
};

exports.cmdlog = (client, message, success) => {
    let args = message.content.slice(1).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    let channel = client.channels.get('609674680168742933');

    if(success) {
        let embed = new discord.RichEmbed()
            .setTitle('New command')
            .setColor('#4bffd1')
            .setThumbnail(message.guild.iconURL)
            .setDescription(`${message.author.tag} (${message.author.id}) just ran command!`)
            .addField('Channel and guild', `Channel: <#${message.channel.id}> (${message.channel.id}), Guild: ${message.guild.name}`)
            .addField('Message content:', message.content)

        channel.send(embed)
    }
    else if(!success) {
        let embed = new discord.RichEmbed()
            .setTitle('New command')
            .setColor('#ff4f39')
            .setThumbnail(message.guild.iconURL)
            .setDescription(`${message.author.tag} (${message.author.id}) just __**unsuccessfully**__ ran command!`)
            .addField('Channel and guild', `Channel: <#${message.channel.id}> (${message.channel.id}), Guild: ${message.guild.name}`)
            .addField('Message content:', message.content);

        channel.send(embed)
    }
};

exports.amlog = (client, say) => {
    let channel = client.channels.get('609674634488709121');
    channel.send(say)
};