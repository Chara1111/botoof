exports.run = (client, message, args) => {
    message.delete();
    const ds = require('discord.js').RichEmbed;
    let obj = args.join(' ');
    let tbh = false;
    const e = new ds()
        .setTitle('Random event!')
        .setDescription(`Person below gets ${obj}!`)
        .setColor('#4aff10');
    message.channel.send(e)
        .then(async(msg) => {
            client.on('message', message =>{
                if(message.channel.id !== msg.channel.id) return;
                if(message.author.bot) return;
                e.setDescription(`${message.author.tag} gets scammed, no ${obj} for you! `);
                e.setColor('#660002');
                e.setURL('https://www.youtube.com/watch?v=XAWgeLF9EVQ');
                if(!tbh) {msg.edit(e)
                tbh = true}
                });
        });
};

exports.help = {
    "command": "scam",
    "aliases": "",
    "description": "You scammer!",
    "usage": ">scam <item to scam>"
};
