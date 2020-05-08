const discord = require('discord.js');

exports.run = (client, message, args) => {
    let mr;
    mr = message.guild.roles.find(r => r.name.toLowerCase() === "muted")
    if(!mr) mr = message.guild.roles.find(r => r.name.toLowerCase().includes("mute"))
    if(!mr) return message.reply("Could not find muted role. Please create a role with name \"Muted\" or edit name of existing one.")
    if(!args[1]) return message.reply("Please specify mute time in minutes (e.g. 15)");
    if(isNaN(Number(args[1]))) return message.reply("Please specify __valid__ mute time in minutes (e.g. 15)");
    let mutetime = Number(args[1]);
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To mute members, you need to have manage channels permission!');
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed);
    if(message.member.highestRole.comparePositionTo(message.guild.members.get(message.mentions.users.first().id).highestRole) < 0) return message.channel.send('<:cross:584800355951443968> You cannot mute person with same role as you or higher.');
    message.guild.members.get(message.mentions.users.first().id).addRole(mr)
        .then(() => {message.channel.send(`<:tick:584800524000296971> Successfully muted ${message.mentions.users.first().tag}`);
        setTimeout(async function() {await message.guild.members.get(message.mentions.users.first().id).removeRole(mr)}, mutetime*60000)})
        .catch(() => {message.channel.send('Couldn\'t mute this user!')})

};

exports.help = {
    "command": "mute",
    "aliases": "",
    "description": "Mute provided member.",
    "usage": ">mute <mention>"
};
