const discord = require('discord.js');
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    let banReason = args.slice(1).join(' ');
    if(!banReason) banReason = 'No reason given';
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To kick members, you need to have kick members permission!');
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed);
    if (!user) {
        try {
            if (!message.guild.members.get(args.slice(0, 1).join(' '))) return message.channel.send('Couldn\'t get a Discord user with this userID!');
        } catch (error) {
            return message.reply('Couldn\'t get a Discord user with this userID!');
        }
    }
    if (user === message.author) return message.reply('You can\'t kick yourself');
    if (!message.guild.member(user).bannable) return message.reply('You can\'t kick this user!');
    if(message.member.highestRole.comparePositionTo(message.guild.members.get(user.id).highestRole) < 1) return message.channel.send('<:cross:584800355951443968> dont try to kick person with ur role or above u');

    await client.users.get(user.id).send(`You were kicked from ${message.guild.name} for: ${banReason}`);

    await message.guild.member(user).kick(banReason);

    const banConfirmationEmbed = new discord.RichEmbed()
        .setColor('RED')
        .setDescription(`💔 ${user.tag} has been successfully kicked!`)
        .addField('Reason:', `${banReason}`);
    message.channel.send({embed: banConfirmationEmbed});

};

exports.help = {
    "command": "kick",
    "aliases": "",
    "description": "Kick provided user by User ID or mention",
    "usage": ">kick <user id/mention> <reason>"
};