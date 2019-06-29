exports.run = async(client, message, args) => {
    const embed = require('discord.js').RichEmbed;
    //the usage
    const usage = new embed()
        .setTitle('Usage of >giveaway command')
        .setColor('#424242')
        .addField('With patterns', '>giveaway pattern start pattern_name')
        .addField('Custom', '>giveaway start amount_of_hours amount_of_winners what to giveaway');

    //not enough permissions fail
    let fail = new embed()
        .setColor('#ff0000')
        .setTitle('Oops!')
        .setFooter('bot created by dank_meme#0001')
        .setDescription('<:cross:584800355951443968> To start giveaways, you need manage channels permission!');
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(fail);

    //patterns
    let patterns = {'hourly500': {'time': 1, 'item': '500 hourly dank memer coins', 'winners': 1}};

    //start function
    async function gstart(hours, winners, item) {
        const giveaway = new embed()
            .setTitle(':tada: Giveaway started! :tada:')
            .setColor('#5769ff')
            .addField('Item to giveaway', item)
            .addField('Ends in', `${hours} hours`)
            .addField('Amount of winners', winners)
            .setFooter('Good luck, react to 🎉 to participate.');

        await message.channel.send(giveaway).then(async msg => {
            await msg.react('🎉');
            setTimeout(async function() {
                let reacted = msg.reactions.get("🎉").users;
                let wonusers = [];
                for(let i=0; i<winners; i++) {
                    console.log(reacted[Math.floor(Math.random() * reacted.size)])
                    //wonusers.push('<@!' + reacted[Math.floor(Math.random() * reacted.array().length)] + '>')
                }

                let won = wonusers.join(', ');

                const ended = new embed()
                    .setTitle(':tada: Giveaway ended! :tada:')
                    .setColor('#00ff00')
                    .setDescription(`Winner(s): ${won}`)
                    .setFooter('Good luck next time!');
                await msg.edit(ended);

                msg.channel.send('Congratulations, ' + won + ', you won ' + item)
            }, hours*3600000);
        })
    }


    if(!args[0]) return message.reply(usage);
    if(args[0] !== 'start' && args[0] !== 'pattern') return message.reply(usage);

    if(args[0] === 'pattern') {
        if(args[1] !== 'start') return message.reply(usage);
        else if(args[1] === 'start') {
            let name = args[2];
            if (name === 'hourly500') return gstart(patterns.hourly500.time, patterns.hourly500.winners, patterns.hourly500.item);
            else return message.reply('Unknown pattern!')
        }
    }

    else if(args[0] === 'start') {
        if(!args[3]) return message.reply(usage);
        if(Number(args[1]) === undefined || isNaN(Number(args[1]))) return message.reply('Please use number as amount of hours!');
        if(Number(args[2]) === undefined || isNaN(Number(args[2]))) return message.reply('Please use number as amount of winners!');
        let hours = args[1];
        let winners = args[2];
        args.shift();
        args.shift();
        args.shift();
        let item = args.join(' ');
        await gstart(hours, winners, item)

    }
};