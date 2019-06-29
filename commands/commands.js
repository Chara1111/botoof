let discord = require('discord.js');

exports.run = (client, message, args) => {
    message.channel.send("WARNING, this menu is being reworked soon, I am not longer working on **this** version so some commands can be missing.")
    let pr = '>';
    const embed = new discord.RichEmbed()
        .setTitle('Please choose the category for commands.')
        .addField('🔨 Staff Commands', `\`${pr}commands mod\``)
        .addField('🎲 Regular Commands', `\`${pr}commands regular\``)
        .addField('💵 Currency Commands', `\`${pr}commands currency\``)
        .addField('🎱 Fun Commands', `\`${pr}commands fun\``)
        .setColor('#2d2d2d');
    if(!args[0]) return message.channel.send(embed);

    if(args[0] === 'mod') {
        const embed2 = new discord.RichEmbed()
            .setTitle('🔨 Staff commands')
            .setColor('#387248')
            .setFooter('bot created by dank_meme#0001')
            .setDescription('<> - required, [] - optional')
            .addField(`${pr}ban <@mention/user id> <reason>`, 'Bans specified person for given reason. Need ban members permission.')
            .addField(`${pr}kick <@mention/user id> <reason>`, 'Kicks specified person for given reason. Need kick members permission.')
            .addField(`${pr}announce <announcement text>`, 'Announce something in current channel. Need manage messages permission.')
            .addField(`${pr}prefix [new prefix]`, 'Sets prefix to given symbol after command. If without - shows current prefix.')
            .addField(`${pr}goal [new goal]`, 'Sets member goal for server to given number after command. If without - shows current goal.');
        message.channel.send(embed2)
    }
    if(args[0] === 'regular') {
        const embed3 = new discord.RichEmbed()
            .setTitle('🎲 Regular commands')
            .setColor('#257682')
            .setFooter('bot created by dank_meme#0001')
            .setDescription('<> - required, [] - optional')
            .addField(`${pr}avatar [mention]`, 'View avatar of given user! If not - shows your avatar!')
            .addField(`${pr}goal`, 'View current member goal!')
            .addField(`${pr}commands <category>`, 'View help page of given category commands!')
            .addField(`${pr}ping`, 'Pong!')
            .addField(`${pr}prefix`, 'View current bots prefix!')
            .addField(`${pr}serverinfo`, 'View info about server!')
            .addField(`${pr}userinfo [mention]`, 'View info about given user, about you if not given!');
        message.channel.send(embed3)
    }
    if(args[0] === 'currency') {
        const embed4 = new discord.RichEmbed()
            .setTitle('💵 Currency commands')
            .setColor('#348743')
            .setFooter('bot created by dank_meme#0001')
            .setDescription('<> - required, [] - optional')
            .addField(`${pr}balance [member]`, 'View your current balance, or balance of given member!')
            .addField(`${pr}beg`, 'Beg for some money!')
            .addField(`${pr}buy <item name>`, 'Buy item with provided name! (broken)')
            .addField(`${pr}inventory [member]`, 'View your inventory, or inventory of given member!')
            .addField(`${pr}leaderboard`, 'View the richest people across all the servers the bot is in!')
            .addField(`${pr}redeem <code>`, 'Redeem promocode and get money if you were first!')
            .addField(`${pr}shop`, 'View shop!')
            .addField(`${pr}transfer <member> <money>`, 'Send given amount of money to given member!')
            .addField(`${pr}quiz`, 'Take a quiz and have chance to win 5 coins if guess!');
        message.channel.send(embed4)
    }
    if(args[0] === 'fun') {
        const embed5 = new discord.RichEmbed()
            .setTitle('🎱 Fun commands')
            .setFooter('bot created by dank_meme#0001')
            .setColor('#745682')
            .setDescription('<> - required, [] - optional')
            .addField(`${pr}b ["embed"]`, '🅱')
            .addField(`${pr}count [seconds]`, 'Start the downcount from given seconds to zero. If not given starts from 60')
            .addField(`${pr}scam <item>`, 'Scam guys with person below gets <item> joke (will be fake)!');
        message.channel.send(embed5)
    }
    if(args[0] === 'developer') {
        if(message.author.id !== require('../configs/auth').ownerID) return message.channel.send('DEVELOPER DANGER ZONE');
        const embed6 = new discord.RichEmbed()
            .setTitle('dev commands')
            .setColor('#938923')
            .addField(`${pr}eval <code>`, 'eval some code')
            .addField(`${pr}status <online/offline/reboot/update>`, 'set bots status')
            .addField(`${pr}addmoney <userid> <amount>`, 'add money to given user')
            .addField(`${pr}addpromo <money> <code>`, 'add new promocode');
        message.channel.send(embed6)
    }
};

exports.help = {
    "command": "commands",
    "aliases": "cmds",
    "description": "view needed commands catrgory",
    "usage": ">help [category]"
}