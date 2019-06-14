exports.run = async(client, message, args) => {
    const embed = require('discord.js').RichEmbed;
    const emb = new embed()
        .setTitle('Oops!')
        .setDescription('<:cross:584800355951443968> To purge the channel you need to have manage messages permission!')
        .setColor('#ff0000');
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(emb);

    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 1 || deleteCount > 100) return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount + 1});
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
};