let discord = require('discord.js');

exports.run = (client, message, args) => {
    let usage = new discord.RichEmbed()
        .setTitle('Choose command menu')
        .setDescription('You will see commands with their usage, and example')
        .setColor('#4764fa')
        .addField('🔨 Moderator commands', '`>cmds mod`') // addrole, ban, kick, mute, purge, removerole, unmute
        .addField('🎲 Fun commands', '`>cmds fun`') // ask, b, count, dice, f, flex, meme, scam
        .addField('🔧 Server-related commands', '`>cmds server`') // announce, giveaway, gp, serverinfo, suggest
        .addField('🤖 Bot-related commands', '`>cmds bot`') // commands, help, info, ping, uptime
        .addField('💯 Regular commands', '`>cmds regular`') // avatar, userinfo
        .setFooter('You are seeing this because probably specified wrong category or didn\'t specify it at all.'); //
    if(!args[0]) return message.reply(usage);

    if(args[0] === 'mod') {
        let commands = new discord.RichEmbed()
            .setTitle('🔨 Moderator commands')
            .setColor('#86ff70')
            .addField('>addrole @user role name/mention/id', '`>addrole @dank_meme#0001 Staff Team🔧`')
            .addField('>ban @user/userid reason', '`>ban @dank_meme#0001 gay raider`')
            .addField('>kick @user reason', '`>kick @dank_meme#0001 chill with the fighting in main chat`')
            .addField('>mute @user amount_of_minutes reason', '`>mute @dank_meme#0001 60 dude stop spamming`')
            .addField('>purge amount of messages between 1 and 100', '`>purge 10`')
            .addField('>removerole @user role name/mention/id', '`>removerole @dank_meme#0001 579324393566502914`')
            .addField('>unmute @user', '`>unmute @dank_meme#0001`');
        message.reply(commands)
    }

    if(args[0] === 'fun') {
        let commands = new discord.RichEmbed()
            .setTitle('🎲 Fun commands')
            .setColor('#ef2bff')
            .addField('>ask question', '`>ask am i gay? :thinking:`')
            .addField('>b', '`>b`')
            .addField('>count seconds', '`>count 10`')
            .addField('>dice sides', '`>dice 6`')
            .addField('>f', '`>f`')
            .addField('>flex', '`>flex`')
            .addField('>meme', '`>meme`')
            .addField('>scam item to scam', '`>scam nitro`');

        message.reply(commands)
    }

    if(args[0] === 'server') {
        let commands = new discord.RichEmbed()
            .setTitle('🔧 Server-related commands')
            .setColor('#4bffd1')
            .addField('>announce announcement text', '`>announce We are at 10 members!` [deprecated]')
            .addField('>giveaway start number_of_hours number_of_winners item to giveaway', '`>giveaway start 24 2 Nitro classic one month! (2 winners!)`')
            .addField('>gp', '`>gp`')
            .addField('>serverinfo', '`>serverinfo`')
            .addField('>suggest', '`>suggest suggestion text` [deprecated]');

        message.reply(commands)
    }

    if(args[0] === 'bot') {
        let commands = new discord.RichEmbed()
            .setTitle('🤖 Bot-related commands')
            .setColor('#74767b')
            .addField('>commands (category name)', '`>commands mod`')
            .addField('>help', '`>help`')
            .addField('>info', '`>info`')
            .addField('>ping', '`>ping`')
            .addField('>uptime', '`>uptime`');

        message.reply(commands)
    }

    if(args[0] === 'regular') {
        let commands = new discord.RichEmbed()
            .setTitle('💯 Regular commands')
            .setColor('#6e2012')
            .addField('>avatar (@user)', '`>avatar`')
            .addField('>userinfo (@user)', '`>userinfo @dank_meme#0001`');

        message.reply(commands)
    }


};

exports.help = {
    "command": "commands",
    "aliases": "cmds",
    "description": "view needed commands catrgory",
    "usage": ">help [category]"
};