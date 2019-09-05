let discord = require('discord.js');

const removereact = async(m, msg, emoji, client) => {
    m.reactions.find(r => r.emoji.name === emoji).remove(client.users.get(msg.author.id))
};

let mod = new discord.RichEmbed()
    .setTitle('🔨 Moderator commands')
    .setColor('#86ff70')
    .addField('>addrole @user role name/mention/id', '`>addrole @dank_meme#0001 Staff Team🔧`')
    .addField('>ban @user/userid reason', '`>ban @dank_meme#0001 gay raider`')
    .addField('>kick @user reason', '`>kick @dank_meme#0001 chill with the fighting in main chat`')
    .addField('>mute @user amount_of_minutes reason', '`>mute @dank_meme#0001 60 dude stop spamming`')
    .addField('>purge amount of messages between 1 and 100', '`>purge 10`')
    .addField('>removerole @user role name/mention/id', '`>removerole @dank_meme#0001 579324393566502914`')
    .addField('>unmute @user', '`>unmute @dank_meme#0001`');

let fun = new discord.RichEmbed()
    .setTitle('🎲 Fun commands')
    .setColor('#ef2bff')
    .addField('>ask question', '`>ask am i gay? :thinking:`')
    .addField('>count seconds', '`>count 10`')
    .addField('>dice sides', '`>dice 6`')
    .addField('>f', '`>f`')
    .addField('>meme', '`>meme`')
    .addField('>scam item to scam', '`>scam nitro`');

let server = new discord.RichEmbed()
    .setTitle('🔧 Server-related commands')
    .setColor('#4bffd1')
    .addField('>announce announcement text', '`>announce We are at 10 members!` [deprecated]')
    .addField('>giveaway start number_of_hours number_of_winners item to giveaway', '`>giveaway start 24 2 Nitro classic one month! (2 winners!)`')
    .addField('>gp', '`>gp`')
    .addField('>serverinfo', '`>serverinfo`')
    .addField('>suggest', '`>suggest suggestion text` [deprecated]');

let bot = new discord.RichEmbed()
    .setTitle('🤖 Bot-related commands')
    .setColor('#74767b')
    .addField('>commands (category name)', '`>commands mod`')
    .addField('>help', '`>help`')
    .addField('>info', '`>info`')
    .addField('>ping', '`>ping`')
    .addField('>uptime', '`>uptime`');

let hundred = new discord.RichEmbed()
    .setTitle('💯 Regular commands')
    .setColor('#6e2012')
    .addField('>avatar (@user)', '`>avatar`')
    .addField('>translate (output lang (2 letters)) (text to translate)', '`>translate en доброе утро страна`')
    .addField('>userinfo (@user)', '`>userinfo @dank_meme#0001`');

exports.run = (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    let usage = new discord.RichEmbed()
        .setTitle('Choose command menu')
        .setDescription('You will see commands with their usage, and example')
        .setColor('#4764fa')
        .addField('Moderator commands', 'Tap on 🔨') // addrole, ban, kick, mute, purge, removerole, unmute
        .addField('Fun commands', 'Tap on 🎲') // ask, count, dice, f, meme, scam
        .addField('Server-related commands', 'Tap on 🔧') // announce, giveaway, gp, serverinfo, suggest
        .addField('Bot-related commands', 'Tap on 🤖') // commands, help, info, ping, uptime
        .addField('Regular commands', 'Tap on 💯') // avatar, userinfo, translate
        .setFooter('Tip: tap on reaction to choose menu'); //

    message.channel.send(usage).then(async msg => {
        await msg.react('🔄');
        await msg.react('🎲');
        await msg.react('🔧');
        await msg.react('🔨');
        await msg.react('🤖');
        await msg.react('💯');

        const collector = msg.createReactionCollector((reaction, user) =>
            user.id === message.author.id && reaction.emoji.name === "🔨" || reaction.emoji.name === "🎲" || reaction.emoji.name === "🔧" || reaction.emoji.name === "🤖" || reaction.emoji.name === "💯" || reaction.emoji.name === "🔄",{time: 60000})
           collector.on('collect', reaction => {
               let name = reaction.emoji.name;
               if(name === '🔄') {msg.edit(usage).catch(() => {});
                   removereact(msg, message, '🔄', client).catch(() => {})}
               else if(name === '🔨') {msg.edit(mod).catch(() => {});
                   removereact(msg, message, '🔨', client).catch(() => {})}
               else if(name === '🎲') {msg.edit(fun).catch(() => {});
                   removereact(msg, message, '🎲', client).catch(() => {})}
               else if(name === '🔧') {msg.edit(server).catch(() => {});
                   removereact(msg, message, '🔧', client).catch(() => {})}
               else if(name === '🤖') {msg.edit(bot).catch(() => {});
                   removereact(msg, message, '🤖', client).catch(() => {})}
               else if(name === '💯') {msg.edit(hundred).catch(() => {});
                   removereact(msg, message, '💯', client).catch(() => {})}
           })
        collector.on('end', () => {
            message.reply('Your menu expired, and can\'t be used now, if you want continue looking commands type command again.')
        })

        })
};

exports.help = {
    "command": "commands",
    "aliases": "cmds",
    "description": "view needed commands catrgory",
    "usage": ">help [category]"
};