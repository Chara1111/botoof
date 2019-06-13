const discord = require('discord.js');
exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To kick members, you need to have kick members permission!');
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed);
    if (!user) {
        try {
            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\'t get a Discord user with this userID!');
        } catch (error) {
            return message.reply('Couldn\'t get a Discord user with this userID!');
        }
    }
    if (user === message.author) return message.reply('You can\'t kick yourself');
    if (!banReason) return message.reply('You forgot to enter a reason for this kick!');
    if (!message.guild.member(user).bannable) return message.reply('You can\'t kick this user!');

    message.guild.member(user).kick(banReason);

    const banConfirmationEmbed = new discord.RichEmbed()
        .setColor('RED')
        .setDescription(`💔 ${user.tag} has been successfully kicked!`);
    message.channel.send({embed: banConfirmationEmbed});

};

exports.help = {
    "command": "kick",
    "aliases": "",
    "description": "Kick provided user by User ID or mention",
    "usage": ">kick <user id/mention> <reason>"
};