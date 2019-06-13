const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const user = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');
    let embed = new discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To ban members, you need to have ban members permission!');
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed);
    if (!user) {
        try {
// Check if a valid userID has been entered instead of a Discord user mention
            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\'t get a Discord user with this userID!');
// If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
            let user1 = message.guild.members.get(args.slice(0, 1).join(' '));
            let user = user1.user;
        } catch (error) {
            return message.reply('Couldn\'t get a Discord user with this userID!');
        }
    }
    if (user === message.author) return message.reply('You can\'t ban yourself');
    if (!banReason) return message.reply('You forgot to enter a reason for this ban!');
    if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user!');

    await message.guild.ban(user);

    const banConfirmationEmbed = new discord.RichEmbed()
        .setColor('RED')
        .setDescription(`🔨 ${user.tag} has been successfully banned!`);
    message.channel.send({embed: banConfirmationEmbed});

};

exports.help = {
    "command": "ban",
    "aliases": "",
    "description": "Ban provided user by User ID or mention",
    "usage": ">ban <user id/mention> <reason>"
};