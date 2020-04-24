exports.run = (client, message, args) => {
    const fs = require('fs');
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
        .setDescription('<:cross:584800355951443968> To start giveaways, you need manage channels permission, be staff, or have Giveaways role!');
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(fail);

    let cache = JSON.parse(fs.readFileSync("./cache.json", "utf8"));

        //patterns
    let patterns = {'hourly500': {'time': 1, 'item': '500 hourly dank memer coins', 'winners': 1}};

    //fill cache function

    function fillcache(active, gid, chid, hours, item, mid, wnrs) {
        cache.giveaway.active = active;
        cache.giveaway.guild = gid;
        cache.giveaway.channel = chid;
        cache.giveaway.time = hours;
        cache.giveaway.item = item;
        cache.giveaway.mid = mid;
        cache.giveaway.winners = wnrs;

        fs.writeFile("./cache.json", JSON.stringify(cache));
    }

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
            fillcache(true, message.guild.id, message.channel.id, hours, item, msg.id, winners);
            await msg.react('🎉');

            setTimeout(async function() {
                if(!cache.giveaway.active) return;

                fillcache(false, "guild id", "channel id", "hours", "item to win", "message id", "amount of winners");

                let reacted = msg.reactions.filter(rx => rx.emoji.name === '🎉').first().users.array();
                let wonusers = [];

                for(let i=0; i<winners; i++) {
                    let id = reacted[Math.floor(Math.random() * reacted.length)];

                    if(id.id === '619805669884952586') return;
                    wonusers.push('<@!' + id.id + '>')
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

    message.delete();


    if(args[0] === 'pattern') {
        if(cache.giveaway.active) return message.reply(`There is already active giveaway there! It is in guild \`${client.guilds.get(cache.giveaway.guild).name}\`, channel <#${cache.giveaway.channel}>. Time was set is ${cache.giveaway.time} hours. Item to giveaway was \`${cache.giveaway.item}\` with ${cache.giveaway.winners} winners`);
        if(args[1] !== 'start') return message.reply(usage);
        else if(args[1] === 'start') {
            let name = args[2];
            if (name === 'hourly500') return gstart(patterns.hourly500.time, patterns.hourly500.winners, patterns.hourly500.item);
            else return message.reply('Unknown pattern!')
        }
    }

    else if(args[0] === 'start') {
        if(cache.giveaway.active) return message.reply(`There is already active giveaway there! It is in guild \`${client.guilds.get(cache.giveaway.guild).name}\`, channel <#${cache.giveaway.channel}>. Time was set is ${cache.giveaway.time} hours. Item to giveaway was \`${cache.giveaway.item}\` with ${cache.giveaway.winners} winners`);
        if(!args[3]) return message.reply(usage);
        if(Number(args[1]) === undefined || isNaN(Number(args[1]))) return message.reply('Please use number as amount of hours!');
        if(Number(args[2]) === undefined || isNaN(Number(args[2]))) return message.reply('Please use number as amount of winners!');
        let hours = args[1];
        let winners = args[2];
        args.shift();
        args.shift();
        args.shift();
        let item = args.join(' ');
        gstart(hours, winners, item)

    }

    else if(args[0] === 'end') {
        if(!cache.giveaway.active) return message.reply("There is no currently running giveaway.");

        let channel = client.channels.get(cache.giveaway.channel);
        if(!channel) return;

        let winners = cache.giveaway.winners;
        let item = cache.giveaway.item;

        let gimsg = channel.fetchMessage(cache.giveaway.mid).then(async gmsg => {

        let reacted = gmsg.reactions.filter(rx => rx.emoji.name === '🎉').first().users.array();
        let wonusers = [];

        for(let i=0; i<winners; i++) {
            let id = reacted[Math.floor(Math.random() * reacted.length)];

            if(id.id === '579715446123790366') return;
            wonusers.push('<@!' + id.id + '>')
        }

        let won = wonusers.join(', ');

        const ended = new embed()
            .setTitle(':tada: Giveaway ended! :tada:')
            .setColor('#00ff00')
            .setDescription(`Winner(s): ${won}`)
            .setFooter('Good luck next time!');
        await gmsg.edit(ended);

        gmsg.channel.send('Congratulations, ' + won + ', you won ' + item);

        fillcache(false, "guild id", "channel id", "hours", "item to win", "message id", "amount of winners");
    })}

    else return message.reply(usage)
};
