const emb = require('discord.js').RichEmbed;

exports.run = (client, message, args) => {
    if(Number(args[0]) === undefined || isNaN(Number(args[0]))) return message.channel.send('Please enter valid whole number of sides which is greater than zero to roll dice.');
    let sides = Number(args[0]);
    if(sides % 1 !== 0) return message.channel.send('Please enter the whole number.');
    if(sides < 1) return message.channel.send('Please enter number greater than zero.');

    let rolled = Math.floor(Math.random() * (sides + 1));
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