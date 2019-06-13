const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
    let goal = JSON.parse(fs.readFileSync("./configs/goals.json", "utf8"));
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To change server member goal, you need to have manage server permission!');
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed);
    if(!args[0]) return message.channel.send(`Current member goal is: \`${goal[message.guild.id].members}\``);


    goal[message.guild.id] = {members: args[0]};
    fs.writeFile("./configs/goals.json", JSON.stringify(goal), (err) => {if (err) console.log(err)});

    let embed2 = new discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle('Success!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription(`<:tick:584800524000296971> Server member goal changed to ${args[0]}`);
    message.channel.send(embed2)
};

exports.help = {
    "command": "goal",
    "aliases": "",
    "description": "Add new server member goal or view current",
    "usage": ">goal {members}"
};