exports.run = (client, message, args) => {
    let randval = Math.round(Math.random());
    let toh;
    if(randval === 0) toh = 'heads!';
    else if(randval === 1) toh = 'tails!';

    message.reply('And it\'s ' + toh)
};