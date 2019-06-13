const emb = require('discord.js').RichEmbed;

exports.run = (client, message, args) => {
    if(Number(args[0]) === undefined || isNaN(Number(args[0]))) return message.channel.send('Please enter valid number of sides to roll dice.')

    let rolled = Math.floor(Math.random() * (Number(args[0]) + 1));
    const embed = new emb()
        .setTitle('Dice roll!')
        .setDescription('You rolled number ' + rolled.toString())
        .setColor('#00ffff')
        .setFooter('You rolled dice with ' + args[0] + ' sides.');
    message.channel.send(embed)
};
exports.help = {
"command": "dice",
    "aliases": "",
    "description": "Roll the dice with given number of sides. ~~actually just random number from zero to given number~~",
    "usage": ">dice <number>"};