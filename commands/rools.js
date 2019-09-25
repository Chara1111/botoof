const myid = require("../configs/auth").ownerID;

exports.run = (client, message, args) => {
    if(message.author.id !== myid) return message.channel.send("no");

    const discord = require("discord.js");
    let embed = new discord.RichEmbed()
        .setTitle("Zroll Official Rules")
        .setColor("90EE90")
        .setDescription("Please follow these rules if you don't want to be punished. You will get a punishment for breaking any of these depends on staff discretion.")
        .addField("1. No being racist.", "Never say the n word, because that can lead you to an instant ban.")
        .addField("2. No toxic behavior. Be respectful.", "Do not argue with someone, go to DM if you want so, don't disrespect staff/members.")
        .addField("3. No advertising anywhere except Self-promote channel.", "DM advertising is a ban. Advertising in chat will get you verbal warning/warn. Don't even try to send links to chat, because it will be auto-deleted.")
        .addField("4. Don't swear.", "We have automod, so keep the chat clean (bypassing automod will get you warned!)")
        .addField("5. Don't spam/flood/xp farm.", "Of course, if you don't want to get no XP role")
        .addField("6. This is an english server.", "If you say non-english words anywhere except <#585419201250983937>, you can get punishment from verbal warning to mute")
        .addField("7. Don't post nsfw.", "This server is fully SFW, and doesn't have any NSFW channels. You will get a ban for posting NSFW pictures.")
        .addField("8. Don't misuse spoilers..", "Spoilers are created not for bypassing automod.")
        .addField("9. Don't try mention everyone/here.", "If you don't have permissions, but you still try to do it - you get a warn. If a staff does it for no reason, then they can get few warns/demote")
        .addField("11. Follow all the discord tos", "This includes the 13 years rule, so if you don't wanna get suddenly banned - don't tell anyone your age.")
        .addField("12. Lastly, use common sense.", " If you want to ask staff a question, firstly look in the <#616301144553160759> channel if it's already answered. Look at channel topics for some more information.")
        .setThumbnail(client.guilds.get("570577194783604736").iconURL)
        .setFooter("Bot and rules made by dank_meme#2268. Have fun in Zroll Official! ;)", message.author.avatarURL);

    message.channel.send(embed)
};