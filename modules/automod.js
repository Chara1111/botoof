exports.ready = () => {
    console.log('Automod is working successfully!');
};

let logger = require('logger');

exports.swear = async(client, message, badword) => {
    if(message.author.bot) return;
    logger.amlog(client, `${message.author.tag} (${message.author.id}) Just said bad word \`${badword}\` in guild ${message.guild.name}, channel <#${message.channel.id}>`)
    if(message.member.roles.get('579343749893586950')) return;

    await message.reply('Watch your language!');

    if(badword === 'nigg') {
        message.member.ban('said n word').catch(() => {
            console.log('Cannot ban ' + message.author.tag + ' for saying n word')
        })
    }

    await message.delete();
};

exports.badwords = ['bitch', 'dick', 'cock', 'fuck', 'fuсk', 'b1tch', 'c0ck', 'nigg', 'asshole', 'assh0le', 'blowjob', 'bl0wjob', 'asshole'];