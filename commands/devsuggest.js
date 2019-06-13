exports.run = (client, message, args) => {
    client.users.get('427007456502218752').send(`New dev suggestion: 
${args.join(' ')}
   
   
   
As suggested by ${message.author.tag}(of user ID ${message.author.id})`);
    message.channel.send('Suggestion successfully sent.')
};