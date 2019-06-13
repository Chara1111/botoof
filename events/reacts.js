exports.run = async(client, message, currency) => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    message.channel.send(`\`EVENT\`
    People in chat need to react to next message, to show that we need to rush 🅱, not 🅰.`);
    await sleep(1000);
    const filter = (reaction) => {
        return reaction.emoji.name === ':b:';
    };
    message.channel.send('🅱').then(message => {
        message.react('🅱').then(msg => {
        message.awaitReactions(filter, { max: 5, time: 10000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                message.channel.send(reaction.author.tag)
            }).catch(collected => {
            message.channel.send(`${collected.size} people reacted, and each will get 15 coins!`);
        })
    })});
};