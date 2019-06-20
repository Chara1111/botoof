const _ = require('underscore')

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async(client, message, args) => {
    let time = new Set()
    let playingid = '577829135729164299';
    let lostid = '577829651158663198';
    message.delete();
    let alive = message.guild.roles.get(playingid).members.map(m=>m.user.id);
    let dead = message.guild.roles.get(lostid).members.map(m=>m.user.id);
    if(!args[0]) return;

    // The random things part

    if(args[0] === 'random') {
        message.delete()
        args.shift();
        let cmdfile = require('./random.js');
            await cmdfile.run(client, message, args, alive, dead, playingid, lostid)
    }

    // revive

    if(args[0] === 'revive') {
        message.delete()
        let player = message.mentions.users.first().id;
        player = message.guild.members.get(player);
        await player.addRole(message.guild.roles.get(playingid), 'Simon Says revived!');
        await player.removeRole(message.guild.roles.get(lostid), 'Simon Says revived!');
        message.channel.send(`${player.user.tag} got revived! :)`)
    }

    //kill

    if(args[0] === 'kill') {
        message.delete()
        let player = message.mentions.users.first().id;
        player = message.guild.members.get(player);
        await player.addRole(message.guild.roles.get(lostid), 'Simon Says lost!');
        await player.removeRole(message.guild.roles.get(playingid), 'Simon Says lost!');
        message.channel.send(`${player.user.tag} got killed! :(`)
    }

    //list of survivors

    if(args[0] === 'alive') {
        message.delete()
        let msg = `The __${alive.length}__ survivors are: `;
        for(let i = 0; i<alive.length; i++) {
            msg += `<@!${alive[i]}> `
        }
        message.channel.send(msg)
    }

    //lock chat

    if(args[0] === 'lock') {
        message.delete()
        close(message, playingid)
    }

    //open chat

    if(args[0] === 'open') {
        message.delete()
        open(message, playingid)
    }


    //          EVENTS (YEA FINALLY)


    // Below does something

    if(args[0] === 'below') {
        message.delete()
        args.shift();
        require('./below').run(client, message, args, playingid, lostid)
    }

    // fake chat

    if(args[0] === 'fakechat') {
        message.delete()
        let choices = ['Siimon', 'S!mon', 'Siman', 'Sim0n', '5imon'];
        let name = choices[Math.floor(Math.random()*choices.length)];
        let tbh = false
        let talked = [];
        message.channel.send(name + ' Says talk in chat. You have 20 seconds')

        setTimeout(async () => {
            message.channel.send('Hey, i misspelled something! Here is users who talked and lost:')
            for (let i=0; i<talked.length; i++) {
                let player = message.guild.members.get(talked[i])
                await player.addRole(message.guild.roles.get(lostid), 'Simon Says lost!');
                await player.removeRole(message.guild.roles.get(playingid), 'Simon Says lost!');
                message.channel.send(`<@!${player.id}> you lost, good luck next time, but don't quit, you can be revived!`)
            }
        }, 20000)

        message.channel.send('**Channel unlocked.**');
        let role = message.guild.roles.get(playingid);
        message.channel.overwritePermissions(
            role, {"SEND_MESSAGES": true}
        )

        client.on('message', async msg => {
            if(msg.author.bot) return;
            if(msg.channel.id !== message.channel.id) return;
            talked.push(msg.author.id)
        })
    }

    // real chat

    if(args[0] === 'realchat') {
        message.delete()
        message.channel.send('Simon Says talk in chat. You have 20 seconds')
        let dtalk = alive;
        setTimeout(async () => {
            message.channel.send('Here is losers who didn\'t talk:')
            for (let i=0; i<dtalk.length; i++) {
                let player = message.guild.members.get(dtalk[i])
                await player.addRole(message.guild.roles.get(lostid), 'Simon Says lost!');
                await player.removeRole(message.guild.roles.get(playingid), 'Simon Says lost!');
                message.channel.send(`<@!${player.id}> you lost, good luck next time, but don't quit, you can be revived!`)
            }
        }, 20000)
        client.on('message', msg => {

            let index = dtalk.indexOf(msg.member.id);
            if(index > -1) dtalk.splice(index, 1)
        })
    }

    // roulette

    if(args[0] === 'roulette') {
        message.delete()
        message.channel.send(`**Roulette**
*everyone will roll a number from 1 to 100 and the biggest one will get something*
--------------------------------------`)
        let everu = {};
        await sleep(5000)
        for(let i=0; i<alive.length; i++) {
            let player = message.guild.members.get(alive[i]);
            let number = Math.floor(Math.random()*101);
            everu[player] = number
            message.channel.send(`🎰 <@!${player.id}> rolled number ${number}`)
            await sleep(500)
        }
    let max = Math.max(...Object.values(everu))
        message.channel.send(`Largest number was ${max}. Winner is ${_.invert(everu)[max]}`)
        let ui = _.invert(everu)[max]

        message.channel.overwritePermissions(_.invert(everu)[max], {"SEND_MESSAGES": true})
        close(message, pid)

    }
};