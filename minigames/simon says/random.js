exports.run = async(client, message, args, alive, dead, pid, lid) => {
    if(!args[0]) return;
    if(args[0] === 'kill') {
        let player = message.guild.members.get(alive[Math.floor(Math.random() * alive.length)]);
        await player.removeRole(message.guild.roles.get(pid), 'Simon Says lost random kill');
        await player.addRole(message.guild.roles.get(lid), 'Simon Says lost random kill');
        message.channel.send(`It's such a bad day for ${player.user.tag}, they got randomly killed!`)
    }
    if(args[0] === 'revive') {
        let player = message.guild.members.get(dead[Math.floor(Math.random() * dead.length)]);
        await player.removeRole(message.guild.roles.get(lid), 'Simon Says random revive');
        await player.addRole(message.guild.roles.get(pid), 'Simon Says random revive');
        message.channel.send(`It's such a good day for ${player.user.tag}, they got randomly revived!`)
    }
};