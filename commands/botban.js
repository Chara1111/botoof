const fs = require('fs')

exports.run = (client,message,args) => {
if(message.author.id !== "398181506423455755" && message.author.id !== "612930885230002208") return message.reply("Woah there, you do not have permission to botban people")

let botbanned = (message.mentions.users.first())
if(!botbanned) botbanned = client.users.get(args[0])
if(!botbanned) return message.reply("Could not find this user, please mention them or enter their user ID")

let bannedlist = JSON.parse(fs.readFileSync("./botbanned.json", "utf8"));
if(bannedlist.includes(botbanned.id)) return message.reply("This user is already bot banned!")
bannedlist.push(botbanned.id)
fs.writeFile("./botbanned.json", JSON.stringify(bannedlist));
return message.reply(`Successfully bot banned ${botbanned.tag}`)
  console.log("real man dude")
}
