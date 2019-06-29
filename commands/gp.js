exports.run = (client, message, args) => {
    if(!message.member.roles.get('579343749893586950')) return message.reply('smh you cant use this command bcuz u need staff team role')

    const embed = require('discord.js').RichEmbed;
    const ping = new embed()
        .setTitle(':tada:')
        .setDescription('New giveaway has started! Don\'t forget to join it! To get <@&580863005294723072> role visit <#570608694308372510>.')
        .setFooter('owo')
        .setColor('#4764fa');
    message.channel.send('<@&580863005294723072>', ping)

};