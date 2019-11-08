exports.run = (client, message, args) => {
    let member;
    let member0 = args[0];
    if(typeof member0 == 'number'){if(message.guild.members.get(member0)){member = message.guild.members.get(member0)}}
    else{if(message.mentions.users.first()) member = message.mentions.users.first()}
    if(!member) return message.reply("Couldn't find a needed person :/. Make sure they are on this server, and that you inputted their user ID or mentioned them");

    // We finally (hopefully) found needed member. Now goes harder part.
    let tdate = Date.now();
    if(member.user === undefined) {}
    else{member = member.user}
    let crdate = member.createdTimestamp;
    for(let i=0;i<5;i++) {
        if(crdate < tdate) crdate = crdate + 31536000000;
    }
    let difference = Math.round((crdate - tdate) / 1000 / 60 / 60 / 24);
    message.reply(member.username + '#' + member.discriminator + '\'s account birthday is in (approx) ' + difference + ' days!')

};