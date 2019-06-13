exports.run = async(client, message, args) => {
    if(!args[1]) return message.channel.send('Please mention valid user and role name.');
    let role = message.guild.roles.find('name', args[1]);
    if(message.member.highestRole.comparePositionTo(role) < 0) return message.channel.send('Uh oh, to assign roles, they need to be below your highest role!');
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