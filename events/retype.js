exports.run = (client, message, currency) => {
    let expired = false;
    let msgs = ['Mining away, i don\'t know what to mine i will mine this anyway, in this minecraft day',
    'roblok is worse than minecraft everyone should agree with this or i will suicide',
    'fortnite is forkinght because why not',
    'why are you typing this sentence if it\'s so long, wait did you just copy it or what, i will be sad if you did :(',
    'dyno bot is nice and mee6 sucks'];
    let msgtotype = msgs[Math.floor(Math.random() * msgs.length)];
    message.channel.send(`\`EVENT\`
First person to retype this sentence will get free coins:
\`${msgtotype}\``)
        .then((msg) => {
        client.on('message', mesg => {
            if(expired) return;
            if(mesg.content.toLowerCase() === msgtotype.toLowerCase()) {
                currency.add(mesg.author.id, 10);
                message.channel.send(`${mesg.author.tag} Wrote it right and got 10 coins!`);
                expired = true;
                msg.edit(`\`EVENT\`
First person to retype this sentence will get free coins:
\`${msgtotype}\`
**This event has expired. No future submissions will be accepted.**`);
        }});


    })
};