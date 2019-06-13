const discord = require('discord.js');
const fs      = require('fs');
let role;
exports.run = (client, message, args) => {
    let mr = JSON.parse(fs.readFileSync("./configs/muteroles.json", "utf8"));
    const noperm = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To change mute role, you need to have manage server permission!');
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(noperm);
    if(!mr[message.guild.id]) role = 'not set yet.';
    else role = `<@&${mr[message.guild.id]}>`;
    if(!args[0]) return message.channel.send(`Current mute-role is ${role}`);
    if(isNaN(Number(args[0])) || Number(args[0]) === undefined) return message.channel.send('Error, please enter valid ID of the mute role.');

    let rid = args[0];

    mr[message.guild.id] = rid;

    fs.writeFile("./configs/muteroles.json", JSON.stringify(mr), (err) => {if (err) console.log(err)});

    message.channel.send('<:tick:584800524000296971> Mute role changed to ' + `<@&${rid}>`)
};

exports.help = {
    "command": "muterole",
    "aliases": "",
    "description": "Set the muted role, or view already set.",
    "usage": ">muterole [role id]"
};