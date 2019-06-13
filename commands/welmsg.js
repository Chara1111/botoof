const discord = require('discord.js');
const fs      = require('fs');

exports.run = (client, message, args) => {
    let welch = JSON.parse(fs.readFileSync("./configs/welmsg.json", "utf8"));
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To change welcome messages channel, you need to have manage server permission!');
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed);
    if(!args[0]) return message.channel.send(`Current prefix is: \`${welch[message.guild.id]}\``);

    let chid = args[0];

    welch[message.guild.id] = chid;

    fs.writeFile("./configs/welmsg.json", JSON.stringify(welch), (err) => {if (err) console.log(err)});

    message.channel.send('<:tick:584800524000296971> Welcome message default channel changed to ' + `<#${chid}>`)


};

exports.help = {
    "command": "welmsg",
    "aliases": "",
    "description": "Set channel for welcome message (by id!!!), or view already set",
    "usage": ">welmsg [#channel]"
};