exports.run = (client, message, currency) => {
    let tbh = false;
    message.channel.send(`\`EVENT\`
    Person below gets some coins!`)
        .then(mesg => {
            client.on('message', msg => {
                if(msg.author.bot) return;
                if(tbh) return;
                tbh = true;
                currency.add(msg.author.id, 5);
                mesg.edit(`\`EVENT\`
Person below gets some coins!
**This event has expired. No future submissions will be accepted.**`);
                message.channel.send(`${msg.author.tag} won 5 coins!`)
            })
        })
};