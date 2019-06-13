const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./configs/prefixes.json", "utf8"));
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To change server prefix, you need to have manage server permission!');
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed);
    if(!args[0]) return message.channel.send(`Current prefix is: \`${prefixes[message.guild.id].prefixes}\``);


    prefixes[message.guild.id] = {prefixes: args[0]};
    fs.writeFile("./configs/prefixes.json", JSON.stringify(prefixes), (err) => {if (err) console.log(err)});

    let embed2 = new discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle('Success!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription(`<:tick:584800524000296971> Server prefix changed to ${args[0]}`);
    message.channel.send(embed2)
};

exports.help = {
    "command": "prefix",
    "aliases": "",
    "description": "View bots prefix or set new",
    "usage": ">prefix {new prefix}"
};