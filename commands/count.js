const fs = require('fs');

exports.run = async(client, message, args) => {
    let cache = JSON.parse(fs.readFileSync("./cache.json", "utf8"));
    if(cache.count.active) return message.reply(`There is already active count! Some information:
Count is in server \`${client.guilds.get(cache.count.guild).name}\`, channel <#${cache.count.channel}>. Time was set is ${cache.count.time}. User who called the command is ${cache.count.user}`);

    let countfrom = args[0];
    if(Number(countfrom) === undefined || isNaN(Number(countfrom))) countfrom = 60;
    countfrom = Number(countfrom);
    if(countfrom > 3600) return message.reply('Number of seconds should be less than 3600 (one hour)');
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const d = require('discord.js').RichEmbed;
    const e = new d()
        .setDescription(countfrom);

    // Filling Cache with information

    cache.count.active = true;
    cache.count.guild = message.guild.id;
    cache.count.channel = message.channel.id;
    cache.count.time = countfrom;
    cache.count.user = message.author.tag;

    fs.writeFile("./cache.json", JSON.stringify(cache), (err) => {if (err) console.log(err)});

    message.channel.send(e)
        .then(async(msg) => {
            for(let i=countfrom; i>-1; i--) {
                e.setDescription(i.toString());
                await msg.edit(e);
                await sleep(1000)
            }
            msg.delete();
            cache.count.active = false
        })
};
exports.help = {
    "command": "count",
    "aliases": "",
    "description": "Start the count from given number to zero (from 60 if not given)",
    "usage": ">count [number]"
};