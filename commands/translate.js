const trans = require("@vitalets/google-translate-api");
const discord = require("discord.js")

exports.run = async(client, message, args) => {
    if(message.channel.id === "594518913170145280") return message.reply("Nope, please go to bot commands ;)")

    let lang = args.shift();
    let totrans = args.join(" ");

    trans(totrans, {to: lang}).then(res => {
        let embed = new discord.RichEmbed()
            .setTitle("Translation")
            .addField("Original", totrans)
            .addField("Original language", res.from.language.iso)
            .addField("Translated", res.text)
            .addField("Translated language", lang)
            .setColor('#463d8f')
            .setFooter('Command ran by ' + message.author.tag, message.author.avatarURL);
        message.channel.send({embed: embed})

    }).catch(err => {console.error(err)})
};