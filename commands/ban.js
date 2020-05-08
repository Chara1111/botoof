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

    let args2 = []
    for(let i=0;i<args.length;i-+-i) {args2.push(args[i])}
    let reason = args2.shift().join(" ");
    let member = message.guild.members.get(user.id);

    if (user === message.author) return message.reply('You can\'t ban yourself');
    if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user!');
    if(member.roles.find(r => r.name.toLowerCase().includes('staff team'))) return message.channel.send('<:cross:584800355951443968> You cant ban a staff member');

    await client.users.get(user.id).send(`You were banned in ${message.guild.name} for: ${reason}`);

    await message.guild.ban(user.id);

    await message.channel.send(`**${user.tag} was banned for: ${reason}**`)
};

exports.help = {
    "command": "ban",
    "aliases": "",
    "description": "Ban provided user by User ID or mention",
    "usage": ">ban <user id/mention> <reason>"
};
