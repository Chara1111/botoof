const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

let target;

let discord = require("discord.js");
exports.run = async(client, message, args) => {
    if(!args[0]) return message.reply("Please mention user to hack");
    if(!message.mentions.users.first()) return message.reply("Please mention user to hack")
    let target = message.mentions.users.first();

    // The hack itself

    let embed = new discord.RichEmbed()
        .setTitle("Hacking " + target.username)
        .setColor("#00FF00")
        .setFooter("[----------] 0%")
        .setDescription("Preparing hack...");
    message.channel.send(embed).then(async msg => {
        await sleep(2000);
        embed.setFooter("[█---------] 10%");
        embed.setDescription("Found email address: " + target.username + "2009@gmail.com");
        await msg.edit(embed);
        await sleep(1500);
        embed.setFooter("[██--------] 20%");
        let passwords = ["12345678", "123454321", target.username, "qwerty", " youcanthackthispassword", "00000000"];
        embed.setDescription("Found password: " + passwords[Math.floor(Math.random() * passwords.length)]);
        await msg.edit(embed);
        await sleep(1500);
        embed.setFooter("[███-------] 30%");
        embed.setDescription("Trying to log in...");
        await msg.edit(embed);
        await sleep(1000);
        embed.setDescription("Account has 2FA dang");
        await msg.edit(embed);
        await sleep(1500);
        embed.setFooter("[████------] 40%");
        embed.setDescription("Injecting virus into phone...");
        await msg.edit(embed);
        await sleep(1500);
        embed.setDescription("Virus injected, Authy app found <:pepevil:587587126577725440>");
        embed.setFooter("[█████-----] 50%");
        await msg.edit(embed);
        await sleep(1000);
        embed.setDescription("Stealing 2FA code...");
        embed.setFooter("[██████----] 60%");
        await msg.edit(embed);
        await sleep(2000);
        embed.setDescription("2FA code: " + Math.floor(Math.random() * 999999));
        await msg.edit(embed);
        await sleep(1500);
        embed.setFooter("[███████---] 70%");
        embed.setDescription ("Trying to log in...");
        await msg.edit(embed);
        await sleep(2000);
        embed.setDescription("Logged in successfully <:pepevil:587587126577725440>");
        await msg.edit(embed);
        await sleep(1000);
        embed.setFooter("[████████--] 80%");
        embed.setDescription("Fetching DMs...");
        await msg.edit(embed);
        await sleep(2000);
        let dms = ["send free minecraft hacks", "say your account info or ban from discord", "gimme nitro", " join my server ples"];
        embed.setDescription("Last DM: " + dms[Math.floor(Math.random() * dms.length)]);
        await msg.edit(embed);
        await sleep(2000);
        embed.setFooter("[█████████-] 90%");
        embed.setDescription("Finding IP adress");
        await msg.edit(embed);
        await sleep(1500);
        embed.setDescription("IP address: 192.168.0." + Math.floor(Math.random() * 99 + 99));
        await msg.edit(embed);
        await sleep(2000);
        embed.setDescription("Sending data to server...");
        await msg.edit(embed);
        await sleep(1500);
        embed.setDescription ("Data sent, hack is complete.");
        embed.setFooter("[██████████] 100%");
        await msg.edit(embed);
    })
};
