function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function close(message, pid) {
    message.channel.send('**Channel locked.**');
    let role = message.guild.roles.get(pid);
    message.channel.overwritePermissions(
       role, {"SEND_MESSAGES": false}
    )
}

function open(message, pid) {
    message.channel.send('**Channel unlocked.**');
    let role = message.guild.roles.get(pid);
    message.channel.overwritePermissions(
        role, {"SEND_MESSAGES": true}
    )
}

async function kill(pid, lid, memberid, message) {
    let player = message.guild.members.get(memberid);
    await player.addRole(message.guild.roles.get(lid), 'Simon Says revived!');
    await player.removeRole(message.guild.roles.get(pid), 'Simon Says revived!');
    message.channel.send(`${player.user.tag} got killed! :(`)
}

exports.run = async(client, message, pid, lid) => {
    let events = ['kill_one', 'revive_one', 'kill_two', 'revive_two'];
    let event  = events[Math.floor(Math.random() * events.length)];

    let chance = Math.floor(Math.random()* 2);
    let fake;
    let word = 'Simon';

    if(chance === 1) fake = true;
    else if(chance === 0) fake = false;

    let choices = ['Siimon', 'S!mon', 'Siman', 'Sim0n', '5imon'];

    if(fake) word = choices[Math.floor(Math.random()* choices.length)];


    // initialize some variables which we needed in future

    let text;
    let secs = Math.floor(Math.random() * 5000) + 5000;

    // Events itself

         if(event === 'kill_one')   {
             text = '`SPEEDTEST`\n' + word +' Says person below can eliminate one person!\nChat will open for a while';
             message.channel.send(text);
             close(message, pid);
             await sleep(secs);
             let tbh = false;
             //message.channel.send('**Channel unlocked**');
             open(message, pid);
             client.on('message', msg => {
                 if(msg.author.bot) return;
                 if(tbh) return;
                 if(msg.channel.id !== message.channel.id) return;
                 if(word === 'Simon') {
                 close(message, pid);
                 tbh = true;
                 msg.channel.overwritePermissions(msg.author, {
                     "SEND_MESSAGES": true
                 });
                 //message.channel.send('**Channel locked**');
                 message.channel.send(`<@!${msg.author.id}> choose someone to kill who will hate you!`)}
                 else {close(message, pid);
                     tbh = true;
                     message.channel.send('Hey, I misspelled something!');
                     kill(pid, lid, msg.author.id, message)}
             })}
    else if(event === 'revive_one') {
             text = '`SPEEDTEST`\n' + word + ' Says person below can revive one person!\nChat will open for a while';
             message.channel.send(text);
             close(message, pid);
             await sleep(secs);
             let tbh = false;
             //message.channel.send('**Channel unlocked**');
             open(message, pid);
             client.on('message', msg => {
                 if(msg.author.bot) return;
                 if(tbh) return;
                 if(msg.channel.id !== message.channel.id) return;
                 if(word === 'Simon') {
                 close(message, pid);
                 tbh = true;
                 msg.channel.overwritePermissions(msg.author, {
                     "SEND_MESSAGES": true
                 });
                 //message.channel.send('**Channel locked**');
                 message.channel.send(`<@!${msg.author.id}> choose someone to revive! You can look in spectator chat.`)}
                 else {close(message, pid);
                     tbh = true;
                     message.channel.send('Hey, I misspelled something!');
                     kill(pid, lid, msg.author.id, message)}
             })
         }
    else if(event === 'kill_two')   {
             text = '`SPEEDTEST`\n' + word + ' Says person below can eliminate *two people*!\nChat will open for a while';
             message.channel.send(text);
             close(message, pid);
             await sleep(secs);
             let tbh = false;
             //message.channel.send('**Channel unlocked**');
             open(message, pid);
             client.on('message', msg => {
                 if(msg.author.bot) return;
                 if(tbh) return;
                 if(msg.channel.id !== message.channel.id) return;
                 if(word === 'Simon') {
                 close(message, pid);
                 tbh = true;
                 msg.channel.overwritePermissions(msg.author, {
                     "SEND_MESSAGES": true
                 });
                 //message.channel.send('**Channel locked**');
                 message.channel.send(`<@!${msg.author.id}> choose ***2 people*** to kill who will hate you!`)}
                 else {close(message, pid);
                     tbh = true;
                     message.channel.send('Hey, I misspelled something!');
                     kill(pid, lid, msg.author.id, message)}
             })
         }
    else if(event === 'revive_two') {
             text = '`SPEEDTEST`\n' + word + ' Says person below can revive ***two people***!\nChat will open for a while';
             message.channel.send(text);
             close(message, pid);
             await sleep(secs);
             let tbh = false;
             //message.channel.send('**Channel unlocked**');
             open(message, pid);
             client.on('message', msg => {
                 if(msg.author.bot) return;
                 if(tbh) return;
                 if(msg.channel.id !== message.channel.id) return;
                 if(word === 'Simon') {
                 close(message, pid);
                 tbh = true;
                 msg.channel.overwritePermissions(msg.author, {
                     "SEND_MESSAGES": true
                 });
                 //message.channel.send('**Channel locked**');
                 message.channel.send(`<@!${msg.author.id}> choose ***2 people*** to revive! You can look in spectator chat.`)
                 }
                 else {close(message, pid);
                 tbh = true;
                 message.channel.send('Hey, I misspelled something!');
                 kill(pid, lid, msg.author.id, message)}
             })
         }
};