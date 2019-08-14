const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

let target;

let discord = require("discord.js");
exports.run = async(client, message, args) => {
    if(!args[0]) return message.reply("Please mention user to hack or enter their tag");
    if(!message.mentions.users.first()) {
        let target = client.users.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase());
        if(!target) {
            let target = client.users.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase());
        }
    }
    else {let target = message.mentions.users.first().user}

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
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setFooter("[██--------] 20%");
        let passwords = ["12345678", "123454321", target.username, "qwerty", " youcanthackthispassword", "00000000"];
        embed.setDescription("Found password: " + passwords[Math.floor(Math.random() * passwords.length)]);
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setFooter("[███-------] 30%");
        embed.setDescription("Trying to log in...");
        msg.edit(embed).then(() => {});
        await sleep(1000);
        embed.setDescription("Account has 2FA dang");
        await sleep(1500);
        embed.setFooter("[████------] 40%");
        embed.setDescription("Injecting virus into phone...");
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setDescription("Virus injected, Authy app found <:pepevil:587587126577725440>");
        embed.setFooter("[█████-----] 50%");
        msg.edit(embed).then(() => {});
        await sleep(1000);
        embed.setDescription("Stealing 2FA code...");
        embed.setFooter("[██████----] 60%");
        msg.edit(embed).then(() => {});
        await sleep(2000);
        embed.setDescription("2FA code: " + Math.floor(Math.random() * 999999));
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setFooter("[███████---] 70%");
        embed.setDescription ("Trying to log in...");
        msg.edit(embed).then(() => {});
        await sleep(2000);
        embed.setDescription("Logged in successfully <:pepevil:587587126577725440>");
        msg.edit(embed).then(() => {});
        await sleep(1000);
        embed.setFooter("[████████--] 80%");
        embed.setDescription("Fetching DMs...");
        msg.edit(embed).then(() => {});
        await sleep(2000);
        let dms = ["send free minecraft hacks", "say your account info or ban from discord", "gimme nitro", " join my server ples"];
        embed.setDescription("Last DM: " + dms[Math.floor(Math.random() * dms.length)]);
        msg.edit(embed).then(() => {});
        await sleep(2000);
        embed.setFooter("[█████████-] 90%");
        embed.setDescription("Finding IP adress");
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setDescription("IP address: 192.168.0." + Math.floor(Math.random() * 99 + 99));
        msg.edit(embed).then(() => {});
        await sleep(2000);
        embed.setDescription("Sending data to server...");
        msg.edit(embed).then(() => {});
        await sleep(1500);
        embed.setDescription ("Data sent, hack is complete.");
        embed.setFooter("[██████████] 100%");
        msg.edit(embed).then(() => {})
    })
};
