const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const user = message.mentions.users.first();
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To ban members, you need to have ban members permission!');
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed);

    if(!user) {
        let user = message.guild.members.get(args.shift());
        if(!user) return message.reply("Couldnt get valid user...")
    }

    let reason = args.join(" ");

    if (user === message.author) return message.reply('You can\'t ban yourself');
    if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user!');
    if(message.member.highestRole.comparePositionTo(user.highestRole) < 1) return message.channel.send('<:cross:584800355951443968> dont try to ban person with ur role or above u');

    await client.users.get(user.id).send(`You were banned in ${message.guild.name} for: ${reason}`);

    await message.guild.ban(user);

    await message.channel.send(`**${user.tag} was banned for: ${reason}**`)
};

exports.help = {
    "command": "ban",
    "aliases": "",
    "description": "Ban provided user by User ID or mention",
    "usage": ">ban <user id/mention> <reason>"
};