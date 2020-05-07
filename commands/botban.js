const fs = require('fs')

exports.run = (client,message,args) => {
if(message.author.id !== "398181506423455755" && message.author.id !== "612930885230002208") return message.reply("Woah there, you do not have permission to botban people")

let botbanned = (message.mentions.users.first())
console.log("debug 1")
if(!botbanned) botbanned = client.users.get(args[0])
console.log("debug 2")
if(!botbanned) return message.reply("Could not find this user, please mention them or enter their user ID")
console.log("debug chapter 1 done")

let bannedlist = JSON.parse(fs.readFileSync("./botbanned.json", "utf8"));
  console.log("debug 2:1")
if bannedlist.includes(botbanned.id) return message.reply("This user is already bot banned!")
  console.log("debug 2:2")
bannedlist.append(botbanned.id)
  console.log("debug 2:3")
fs.writeFile("./botbanned.json", JSON.stringify(bannedlist));
  console.log("debug 2:4")
return message.reply(`Successfully bot banned ${botbanned.tag}`)
  console.log("real man dude")
}
