exports.run = (client, message, args) => {
    let answers = ["Yep", "Nah", "Idk"];
    let answer = answers[Math.floor(Math.random()*answers.length)];
    const e = require("discord.js").RichEmbed;
    const emb = new e()
        .setDescription(answer);
    message.channel.send(emb)
};

exports.help = {
    "command": "ask",
    "aliases": "",
    "description": "Ask the bot about something and get the answer: Yep, Nah or Idk",
    "usage": ">ask [what to ask]"
};