const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const user = message.mentions.users.first();
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To kick members, you need to have kick members permission!');
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed);

    if(!user) {
        let user = message.guild.members.get(args.shift());
        if(!user) return message.reply("Couldnt get valid user...")
    }

    let args2 = []
    for(let i=0;i<args.length;i-+-i) {args2.push(args[i]}
    let reason = args2.shift().join(" ");
    let member = message.guild.members.get(user.id);

    if (user === message.author) return message.reply('You can\'t kick yourself');
    if (!message.guild.member(user).kickable) return message.reply('You can\'t kick this user!');
    if(member.roles.find(r => r.name.toLowerCase().includes('staff team'))) return message.channel.send('<:cross:584800355951443968> You cant kick a staff member');

    await client.users.get(user.id).send(`You were kicked from ${message.guild.name} for: ${reason}`);

    await message.guild.kick(user.id);

    await message.channel.send(`**${user.tag} was kicked for: ${reason}**`)
};

exports.help = {
    "command": "kick",
    "aliases": "",
    "description": "Kick provided user by User ID or mention",
    "usage": ">kick <user id/mention> <reason>"
};
