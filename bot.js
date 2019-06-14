const Discord                 = require('discord.js');
const Canvas                  = require('canvas');
const client                  = new Discord.Client();
const auth                    = require('./configs/auth.json');
const fs                      = require('fs');
const { Users, CurrencyShop } = require('./dbObjects');
const { Op }                  = require('sequelize');
const currency                = new Discord.Collection();
const beglimit                = new Set();
const quizlimit               = new Set();
const invites                 = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const force = process.argv.includes('--devonly')

Reflect.defineProperty(currency, 'add', {
    value: async function add(id, amount) {
        const user = currency.get(id);
        if (user) {
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        currency.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(currency, 'getBalance', {
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
});

// events

client.on('ready', async() => {  // when bot is ready
    sleep(1000)

    const storedBalances = await Users.findAll();

    storedBalances.forEach(b => currency.set(b.user_id, b));

    console.log(`Logged in as ${client.user.tag}! Developer mode: ${force}`);

    client.user.setActivity(`${client.users.size} users`, {type: "WATCHING"});  // rich presence

    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
    sleep(1000)
});

client.on('message', async(message) => { //when message received
    let prefixes = JSON.parse(fs.readFileSync('./configs/prefixes.json', 'utf-8'));
    if(!prefixes[message.guild.id]) {prefixes[message.guild.id] = {prefixes: auth.prefix}}
    let prefix = prefixes[message.guild.id].prefixes;

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    client.user.setActivity(`${client.users.size} users`, {type: "WATCHING"});  // rich presence

    if(sender.bot) return; // if bot, ignore

    if(message.content.includes('<@!437629779982942210>' || '<@437629779982942210>')) {message.channel.send('```Please Dont Ping Zroll For No Specific Reason\n' +
        '-----------------------------------------\n' +
        'If You Continue Pinging This Might Cause A Mute Or A Ban Thanks```');
    message.react('579347864556142593')}

    if(message.content.includes('<@!579715446123790366>')) {message.reply(`Current prefix on this guild is \`${prefix}\``)}

    if(message.content.toLowerCase().includes('my 18+ photos') || message.content.toLowerCase().includes('my naked photos')) {
        if(message.channel.id !== '579615725002424322') return;
        await message.delete()
            .catch(() => {})
        await client.users.get(message.member.id).send('ay listen little piece of shit, if you gonna continue i will find u. also if ya want to know, me (bot) auto ban u, u have no way so better stop\n\n\n\n\n\n\nget noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob get noob').catch(() => {})
        await message.member.ban('Auto bot detector.')
        let mainchat = client.channels.get('570597613762641945')
        await mainchat.send(`${message.author.tag} was auto-banned cuz of nsfw and bot. (duh) <a:ajesus:582566348207554571>`)
    }

    if (!message.content.startsWith(prefix)) return; // if start without prefix - ignore

    if(auth.ownerID !== message.author.id && force) return message.channel.send('Bot is currently running in developer mode. Only developer can use bot commands. Please be patient.');

    if (cmd === 'balance' || cmd === 'bal' || cmd === 'money') {
        const target = message.mentions.users.first() || message.author;
        return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
    }
    else if (cmd === 'inventory' || cmd === 'inv') {
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    }
    else if (cmd === 'transfer' || cmd === 'send' || cmd === 'give') {
        let currentAmount = currency.getBalance(message.author.id);
        let transferAmount = args[1]; /* args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg)); */
        if(transferAmount === 'max' || transferAmount === 'all') transferAmount = currency.getBalance(sender.id);
        if(transferAmount === 'half') transferAmount = currency.getBalance(sender.id) / 2;
        const transferTarget = message.mentions.users.first();

        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

        currency.add(message.author.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);

        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
    }
    else if (cmd === 'buy') {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args } } });
        if (!item) return message.channel.send(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(message.author.id)) {
            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
        }

        const user = await Users.findOne({ where: { user_id: message.author.id } });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);

        message.channel.send(`You've bought: ${item.name}.`);
    }
    else if (cmd === 'shop' || cmd === 'store') {
        const items = await CurrencyShop.findAll();
        return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
    }
    else if (cmd === 'leaderboard' || cmd === 'richest' || cmd === 'rich' || cmd === 'lb') {
        return message.channel.send(
            currency.sort((a, b) => b.balance - a.balance)
                .filter(user => client.users.has(user.user_id))
                .first(10)
                .map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
                .join('\n'),
            { code: true }
        );
    }
    else if (cmd === 'beg') {
        const randnames = ['Jesus', 'God', 'PewDiePie', 'T-series', 'Scout', 'Zroll', 'Bianca', 'Fruxz', 'Doki', 'Someone', 'Anonymous', 'A secret person',
        'Nobody', 'Steve', 'Dyno', 'MEE7', 'SoundNothing', 'Poor person', 'Bill Gates', 'Kev', 'Notch']
        let randname = randnames[Math.floor(Math.random() * randnames.length)]
        const emb = new Discord.RichEmbed()
            .setTitle('Hey, stop begging so much!')
            .setColor('#ff0000')
            .setDescription('Default cooldown for beg command is 100 seconds (1m 40s), but *premium* users can use command once per `50` seconds!');
        if (beglimit.has(message.author.id)) return message.channel.send(emb);
        let received = Math.floor(Math.random() * 11);
        currency.add(message.author.id, Number(received));
        if(received === 0) message.channel.send(randname + ' said he is too poor to donate to you')
        else message.channel.send(randname +' donated ' + received + ' money to you!');
        let pusers = JSON.parse(fs.readFileSync('./configs/premium.json', 'utf-8'));
        let user = message.member;

        let timeout = 50000

        let index = pusers.indexOf(user.id)

        if(isNaN(index) || index === undefined || index < 0) timeout = 100000

        beglimit.add(message.author.id);
        setTimeout(() => {
            beglimit.delete(message.author.id);
        }, timeout);
    }
    else if (cmd === 'quiz' || cmd === 'trivia') {
        const emb = new Discord.RichEmbed()
            .setTitle('Hey, stop stop guessing so much!')
            .setColor('#ff0000')
            .setDescription('Default cooldown for quiz command is 60 seconds(1 minute), but premium users can use it once per `20` seconds!');
        if (quizlimit.has(sender.id)) return message.channel.send(emb);
        const quiz = require('./configs/quiz.json');

        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const answers = item.answers
        const randanswer = answers[Math.floor(Math.random() * answers.length)]
        const embod = new Discord.RichEmbed()
            .setColor('#837583')
            .setTitle(`${message.author.tag}'s quiz question!`)
            .setDescription(item.question);

        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };

        message.channel.send(embod).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer and gets 5 coins!`);
                    currency.add(collected.first().author.id, 5)
                })
                .catch(collected => {
                    message.channel.send('**Time is over!** ⏰\nAnswer was ' + randanswer + '\nNo future submissions will be accepted!');
                });
        });

        let pusers = JSON.parse(fs.readFileSync('./configs/premium.json', 'utf-8'));
        let user = message.member;

        let timeout = 20000

        let index = pusers.indexOf(user.id)

        if(isNaN(index) || index === undefined || index < 0) timeout = 60000

        quizlimit.add(message.author.id);
        setTimeout(() => {
            quizlimit.delete(message.author.id);
        }, timeout);
    }
    else if (cmd === 'addmoney') {
        if (auth.ownerID !== message.author.id) return message.channel.send('Command only for developer!');
        currency.add(args[0].toString(), Number(args[1]));
            message.channel.send('Succesfully added ' + args[1] + ' coins to user ID `' + args[0] + '`');
            console.log('ADDED ' + args[1] + ' COINS TO USER ID `' + args[0] +'`')
    }
    else if (cmd === 'redeem') {
        let embfail = new Discord.RichEmbed()
            .setTitle('Oops!')
            .setDescription('Promocode either invalid or already has been activated!')
            .setColor('#ff0000');
        let promos = JSON.parse(fs.readFileSync("./configs/promo.json", "utf8"));
        let code = Number(promos[args[0]]);
        if (code === undefined) return message.channel.send(embfail);
        if (isNaN(code)) return message.channel.send(embfail)
        else if(code === "none") return message.channel.send(embfail);
        currency.add(message.author.id, code);
        let embremb = new Discord.RichEmbed()
            .setTitle('Success!')
            .setColor('#00ff00')
            .setDescription('Code activated, ' + code + ' coins added to your balance.');
        message.channel.send(embremb);
        console.log(`${message.author.tag} activated ${args[0]} code in guild ${message.guild}`);
        promos[args[0]] = "none";
        fs.writeFile("./configs/promo.json", JSON.stringify(promos), (err) => {if (err) console.log(err)});
    }
    else if (cmd === 'addpromo') {
        if(message.author.id !== auth.ownerID) return message.channel.send('**Command is only for developer!**');
        let promos = JSON.parse(fs.readFileSync("./configs/promo.json", "utf8"));
        promos[`${args[0]}`] = args[1];
        fs.writeFile("./configs/promo.json", JSON.stringify(promos), (err) => {if (err) console.log(err)});
        console.log('Promo ' + args[0] + ' successfully added with reward ' + args[1]);
        message.channel.send('Promocode successfully added.')
    }
    else if (cmd === 'wipemoney') {
        if (auth.ownerID !== sender.id) return message.channel.send('Command only for developer!');
        currency.add(args[0].toString(), -currency.getBalance(args[0].toString()));
        message.channel.send('Wiped money of ' + args[0] + ' user ID.');
        console.log('Wiped money of ' + args[0] + ' user id');
    }
    else if (cmd === 'gamble' || cmd === 'bet') {
        let bet = args[0]
        if(bet === 'max' || bet === 'all') bet = currency.getBalance(sender.id)
        if(bet === 'half') bet = currency.getBalance(sender.id) / 2
        bet = Math.floor(Number(bet))
        const embedprogress = new Discord.RichEmbed()
            .setTitle(`${sender.tag}'s gambling game!`)
            .setDescription('*Gambling*')
            .setColor('#ffffff')
            .setFooter(`Bet: ${bet}`);
        const embedwin = new Discord.RichEmbed()
            .setTitle(`${sender.tag}'s gambling game!`)
            .addField(`You won ` + bet + ' coins :)', `You now have ${currency.getBalance(sender.id) + bet} coins`)
            .setFooter(`Bet: ${bet}`)
            .setColor('#00ff00');
        const embedlose = new Discord.RichEmbed()
            .setTitle(`${sender.tag}'s gambling game!`)
            .addField('You lost ' + bet + ' coins :(', `You now have ${currency.getBalance(sender.id) - bet} coins`)
            .setColor('#ff0000')
            .setFooter(`Bet: ${bet}`);
        if (!bet || isNaN(bet)) return message.channel.send(`Sorry, that's an invalid amount.`);
        if (bet > currency.getBalance(sender.id)) return message.channel.send(`Sorry, you only have ${currency.getBalance(sender.id)}.`);
        if (bet <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
        if (typeof args[0] !== 'string') return message.reply('Please give a ***number*** to bet.');
        const loseorwin = Math.floor(Math.random() * 2)
        Number(loseorwin)
        message.channel.send(embedprogress)
            .then(async msg => {
                await sleep(3000)
                if(loseorwin === 1) {
                    currency.add(sender.id, -bet)
                    msg.edit(embedlose)
                } // lose
                else if(loseorwin === 0) {
                    currency.add(sender.id, bet)
                    msg.edit(embedwin)
                } // win
            })
    }
    else if (cmd === 'premium') {
        if(auth.ownerID !== sender.id) return;
        let pusers = JSON.parse(fs.readFileSync('./configs/premium.json', 'utf-8'));
        let user = message.guild.members.get(args[1]);
        let prem;
        var index = pusers.indexOf(args[1]);
        if(isNaN(index) || index === undefined || index < 0) prem = 'Non-premium'
        else prem = 'Premium'

        if (args[0] === 'add') {
            pusers.push(args[1].toString())
            fs.writeFile("./configs/premium.json", JSON.stringify(pusers), (err) => {if (err) console.log(err)});
            message.channel.send('This user is premium user now!')
            console.log(`${args[1]} is premium now.`)
        }
        else if (args[0] === 'remove') {
            pusers.splice(index, 1)
            fs.writeFile("./configs/premium.json", JSON.stringify(pusers), err => {if (err) console.log(err)})
            message.channel.send('This user is no longer premium OOF')
            console.log(`${args[1]} is no more premium now.`)}
        else if (args[0] === 'check') message.channel.send(`\`${args[1]}\` user ID premium status is: ${prem}`)
    }
    else if (cmd === 'ss') {
        if (auth.ownerID !== sender.id) return;
        let file = require(`./minigames/simon says/main.js`);
        file.run(client, message, args)
    }
    else {
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch(e) {
        console.log(e.message)
    } finally {
        console.log(`${message.author.tag} ran the command: "${cmd}" in the guild: ${message.guild.name}`)
    }

}
    const chofev = Math.floor(Math.random()* 100);
    let evs = ['belowdude', 'firstreact', 'belowdudes', 'retype', 'spellword'];
    evs = ['retype', 'belowdude'];
    let ev = evs[Math.floor(Math.random()* evs.length)];
    let cmdfile = require(`./events/${ev}.js`);
    if(chofev === 43) cmdfile.run(client, message, currency)

});

client.on('guildMemberAdd', async(member) => {
    if(member.guild.id !== '570577194783604736') return;

    const allch = JSON.parse(fs.readFileSync("./configs/welmsg.json", "utf8"));

    const channel = member.guild.channels.get(allch[member.guild.id]);

    let dif = member.joinedAt - member.user.createdAt;
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id]
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        if(dif < 86400000) {
            client.channels.get('570597613762641945').send(`${member.user.tag} (user ID ${member.user.id}) just joined (probability of alt, created less than 1 day ago). Invited by ${inviter.tag}`)
        };
        const joinemb = new Discord.RichEmbed()
            .setTitle("New member")
            .setDescription(`${member.user.tag} just joined. Invited by ${inviter.tag}. This invite was used ${invite.uses} times.`)
            .setFooter(`huh, we have ${member.guild.memberCount} members`, member.user.avatarURL)
            .setThumbnail(member.user.avatarURL)
            .setColor('#387583');
        channel.send(joinemb)
    });

    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./IDEK.jpeg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to the ${member.guild.name},`, canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`We now have ${member.guild.memberCount} members!`, canvas.width / 2.5, canvas.height / 1.2);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(avatar, 25, 0, 200, canvas.height);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server!`, attachment);
});

client.login(process.env.BOT_TOKEN);
