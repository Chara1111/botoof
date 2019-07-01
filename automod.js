exports.ready = () => {
    console.log('Automod is working successfully!');
};

exports.swear = async(client, message, badword) => {
    if(message.author.bot) return;
    if(message.member.roles.get('579343749893586950')) return;

    await message.reply('Watch your language!');

    if(badword === 'nigg' || badword === 'niger') {
        message.member.ban('said n word').catch(() => {
            console.log('Cannot ban ' + message.author.tag + ' for saying n word')
        })
    }

    await message.delete();
};

exports.badwords = ['bitch', 'dick', 'cock', 'fuck', 'fuсk', 'b1tch', 'c0ck', 'nigg', 'niger', 'niga', 'asshole', 'assh0le', 'blowjob', 'bl0wjob'];