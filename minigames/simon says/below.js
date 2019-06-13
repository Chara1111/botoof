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

exports.run = (client, message, args, pid, lid) => {
    let event = args[1];

    if (event === 'speedtest') {
        require('./events/speedtest').run(client, message, pid, lid)
    }

    else if (event === 'lose') {
        let tbh = false;
        message.channel.send('Simon Says person below can get a custom role on this server!!!\n\n\n\n||Hint: thats loser role||');
        open(message, pid);
        client.on('message', async(msg) => {
            if(msg.author.bot) return;
            if(message.channel.id !== msg.channel.id) return;
            if(tbh) return;
            tbh = true;
            msg.member.addRole(message.guild.roles.get(lid));
            msg.member.removeRole(message.guild.roles.get(pid));
            close(message, pid)
        })
    }

    else if (event === 'fakewin') {
        message.channel.send('Person below is an absolute winner!');
        let tbh = false;
            client.on('message', msg => {
                if(msg.author.bot) return;
                if(msg.channel.id !== message.channel.id) return;
                if(tbh) return;
                msg.member.addRole(lid);
                msg.member.removeRole(pid);
                message.channel.send('Ay, i didnt say Simon Says, so u lost bro!');
                tbh = true
            })
    }
};