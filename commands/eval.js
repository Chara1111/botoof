const ownerid = require('../configs/auth.json').ownerID;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async (client, message, args) => {
    if(message.author.id !== ownerid) return message.channel.send('Oops, this command is only for developer!');
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);}
};