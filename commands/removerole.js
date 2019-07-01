exports.run = async(client, message, args) => {
    const emb = require('discord.js').RichEmbed;

    const embed = new emb()
        .setTitle('Uh oh!')
        .setDescription('To assign roles to members, you need to have manage roles permission!')
        .setColor('#ff0000');
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed);
    if(!args[0]) return message.channel.send('Please mention valid user.');
    let role;
    if(message.mentions.roles.first()) let role = message.mentions.roles.first();
    else if(message.guild.roles.get(args[1])) let role = message.guild.roles.get(args[1]);
    else if(message.guild.roles.find('name', args[1])) let role = message.guild.roles.find('name', args[1]);
    else return message.channel.send("Please mention valid role/say it name/id");
    if(message.member.highestRole.comparePositionTo(role) < 1) return message.channel.send('Uh oh, to assign roles, they need to be below your highest role!');
    let user = message.mentions.users.first().id;
    user = message.guild.members.get(user);
    await user.removeRole(role.id);
    message.channel.send(`Removed ${role.name} role from ${user.user.tag}`)
};

exports.help = {
    "command": "removerole",
    "aliases": "",
    "description": "Remove role from mentioned person.",
    "usage": ">removerole <@mention> <exact role name>"
};