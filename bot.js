const Discord                 = require('discord.js');
const Canvas                  = require('canvas');
const client                  = new Discord.Client();
const auth                    = require('./configs/auth.json');
const invites                 = {};
const automod                 = require('./modules/automod');
const limited                 = new Set();
const logger                  = require('./modules/logger');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let force = process.env.DEVONLY;

if(force === 'true') force = true;
else if(force === 'false') force = false;

// events

client.on('ready', async() => {  // when bot is ready
    sleep(1000);

    console.log(`Logged in as ${client.user.tag}! Developer mode: ${force}`);

    automod.ready();
    logger.ready();
    logger.botlog(client, 'ready');

    await client.user.setActivity(`${client.users.size} users`, {type: "WATCHING"});  // rich presence

    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        })
            .catch(() => {})
    });
    sleep(1000);

    setInterval(async function() {
        const statuses = ['Update v1.0.5!', 'smh i added automod and giveaways', `${client.users.size} users`];
        let stat = statuses[Math.floor(Math.random() * statuses.length)];
        logger.statuslog(client, stat);
        await client.user.setActivity(`${stat}`, {type: "WATCHING"})}, 10000);

    setInterval(function() {const channel = client.channels.get('579591616071729162');
    channel.send(`Daily activity check
React to <:pepeOK:587586401000751125> to confirm you are active.`).then(async msg => {
        await msg.react('587586401000751125');
        logger.log(client, 'check')
    })}, 86400000)
});

client.on('message', async(message) => { //when message received
    if(message.channel.id === '594518913170145280') client.channels.get('612323049575940216').send(`${message.author.tag}: ${message.content}`).then(() => {});
    if(message.channel.type === "dm" || message.channel.type === "group") return;

    let prefix = '>';

    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    await client.user.setActivity(`${client.users.size} users`, {type: "WATCHING"});  // rich presence

    if(sender.bot) return; // if bot, ignore

    let swears = automod.badwords;

    for(let i=0; i<swears.length; i++) {
        if(message.content.toLowerCase().includes(swears[i])) {
            await automod.swear(client, message, swears[i])
        }
    }

    if(message.content.includes('<@!437629779982942210>' || message.content.includes('<@437629779982942210>'))) {message.channel.send('```Please Dont Ping Zroll For No Specific Reason\n' +
        '-----------------------------------------\n' +
        'If You Continue Pinging This Might Cause A Mute Or A Ban Thanks```');
    await message.react('579347864556142593')}

    if(message.content.includes('<@!579715446123790366>') || message.content.includes("<@579715446123790366>")) {message.reply(`Current prefix is \`>\``)}

    if(message.channel.id === '579615725002424322' && message.content !== '!verify ' ) return message.delete();

    if (!message.content.startsWith(prefix)) return; // if start without prefix - ignore

    if(cmd.startsWith(':') || cmd.startsWith(' ')) return;

    if(auth.ownerID !== message.author.id && force) return message.channel.send('Bot is currently running in developer mode. Only developer can use bot commands. Please be patient.');

    if(limited.has(message.author.id)) return message.reply('You are being rate limited. Bot commands can be used once per 1.5 seconds.');

    limited.add(message.author.id);

    setTimeout(function() {
        limited.delete(message.author.id)
    }, 1500);

    if (cmd === 'ss') {
        if (auth.ownerID !== sender.id && sender.id !== '437629779982942210') return;
        let file = require(`./minigames/simon says/main.js`);
        file.run(client, message, args)
    }
    else {
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
        logger.cmdlog(client, message, true)
    } catch(e) {
        console.log(e.message);
        logger.cmdlog(client, message, false)
    } finally {
        console.log(`${message.author.tag} ran the command: "${cmd}" in the guild: ${message.guild.name}`)
    }
}
});

client.on('guildMemberAdd', async(member) => {
    if(member.guild.id !== '570577194783604736') return;
    member.guild.channels.get("570926226219335690").setName(`Member Count: ${member.guild.memberCount}`).then(() => {});

    member.guild.channels.get("570926227230162974").setName(`User Count: ${member.guild.members.filter(member => !member.user.bot).size}`).then(() => {});

    member.guild.channels.get("570926226676383745").setName(`Bot Count: ${member.guild.members.filter(member => member.user.bot).size}`).then(() => {});

    const channel = member.guild.channels.get('594518913170145280');

    let dif = member.joinedAt - member.user.createdAt;
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        if(dif < 86400000) {
            client.channels.get('570597613762641945').send(`${member.user.tag} (user ID ${member.user.id}) just joined (probability of alt, created less than 1 day ago). Invited by ${inviter.tag}`)
        }
        if(invite.uses === undefined || isNaN(invite.uses) || invite.uses === null) invite.uses = 1;
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

    const background = await Canvas.loadImage('./bgimage.png');
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

client.on('guildMemberRemove', async(member) => {
    if(member.guild.id !== '570577194783604736') return;

    member.guild.channels.get("570926226219335690").setName(`Member Count: ${member.guild.memberCount}`).then(() => {});

    member.guild.channels.get("570926227230162974").setName(`User Count: ${member.guild.members.filter(member => !member.user.bot).size}`).then(() => {});

    member.guild.channels.get("570926226676383745").setName(`Bot Count: ${member.guild.members.filter(member => member.user.bot).size}`).then(() => {});


    const channel = member.guild.channels.get('570577195223875595');

    const emb = new Discord.RichEmbed()
        .setTitle('Member left 😦')
        .setColor('#bf0000')
        .setDescription(`We just lost ${member.user.tag}. We now have ${member.guild.memberCount} members.`)
        .setFooter('bot made by dank_meme#0001');
    channel.send(emb)
});

client.login(process.env.BOT_TOKEN).then();
