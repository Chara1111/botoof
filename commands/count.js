exports.run = async(client, message, args) => {
    let countfrom = args[0];
    if(countfrom === undefined || isNaN(countfrom)) countfrom = 60;
    countfrom = Number(countfrom);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const d = require('discord.js').RichEmbed;
    const e = new d()
        .setDescription(countfrom);
    message.channel.send(e)
        .then(async(msg) => {
            for(let i=countfrom; i>-1; i--) {
                e.setDescription(i.toString());
                await msg.edit(e);
                await sleep(1000)
            }
            msg.delete()
        })
};
exports.help = {
    "command": "count",
    "aliases": "",
    "description": "Start the count from given number to zero (from 60 if not given)",
    "usage": ">count [number]"
};