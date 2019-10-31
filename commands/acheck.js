

const discord = require("discord.js")

exports.run = (client, message, args) => {
// Checking if executor is a staff member
let failedEmbed = new discord.RichEmbed()
    .setTitle("Oops!")
    .setColor("#FF0000")
    .setDescription("<:cross:584800355951443968> You should be a staff member to execute this command.")
    .setFooter("If you think this is an error, try contacting bot creator(dank_meme#2268)");

if(!message.member.roles.get("579343749893586950") && message.author.name!== "dank_meme") return message.reply(failedEmbed)

// Setting up
let acc = client.channels.get("579591616071729162"); // activity check channel
if(!args[0] || args[0] + 1 == NaN) return message.reply("Enter valid message id from <#579591616071729162>.")
let msgid = args[0];

// Fetching the activity check message
acc.fetchMessage(msgid).then(msg => {

// Setting up (ye again)
let reacted = msg.reactions.filter(emoji => emoji.emoji.id === "587586401000751125").first().users.array().map(u => u.id)
let unreacted = msg.guild.roles.get("579343749893586950").members.map(u => u.user.id)
console.log(reacted);
console.log(unreacted);
// Removing from unreacted array everyone from reacted array
for(let i = 0;i<reacted.length;i++){
unreacted.splice(unreacted.indexOf(reacted[i]), 1)
}

// Making a list of reacted/unreacted people
let unrstring = "List of people who did not react on activity check:\n"
for(let i = 0;i<unreacted.length;i++) {
unrstring = unrstring +  message.guild.members.get(unreacted[i]).user.username + "#" + message.guild.members.get(unreacted[i]).user.discriminator + "\n"
}

let rstring = "List of people who did react on activity check:\n"
for(let i = 0;i<reacted.length;i++) {
rstring = rstring +  message.guild.members.get(reacted[i]).user.username + "#" + message.guild.members.get(reacted[i]).user.discriminator + "\n"
}
// Sending success check message
message.reply(unrstring + rstring)

}).catch(error => {message.reply("There was an error during executing this command! `" + error.message + "`")})




}
