const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")
    let subreddits = ['dankmemes', 'memes'];
    let sub = subreddits[Math.floor(Math.random() * subreddits.length)];
    try {
        const { body } = await snekfetch
            .get(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`)
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length);
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle(allowed[randomnumber].data.title)
            .setImage(allowed[randomnumber].data.url)
            .setURL(allowed[randomnumber].data.url)
            .setFooter("⬆ " + allowed[randomnumber].data.ups + " 🗨 " + allowed[randomnumber].data.num_comments);
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
};