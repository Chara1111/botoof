exports.ready = () => {
    console.log('Automod is working successfully!');
};

exports.swear = async(client, message, badword) => {
    await message.reply('Watch your language!');

    if(badword === 'nigg' || badword === 'niga' || badword === 'niger') {
        message.member.ban('said n word').catch(() => {
            console.log('Cannot ban ' + message.author.tag + ' for saying n word')
        })
    }

    await message.delete();
};

exports.badwords = ['bitch', 'dick', 'cock', 'fuck', 'fuсk', 'b1tch', 'c0ck', 'nigg', 'niger', 'niga'];