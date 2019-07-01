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
        .setDescription('<:cross:584800355951443968> To start giveaways, you need manage channels permission, be staff, or have Giveaways role!');
    if(!message.member.hasPermission("MANAGE_CHANNELS") && !message.member.roles.get('582542821123293194') && !message.member.roles.get('584860556381519876')) return message.channel.send(fail);

    let cache = JSON.parse(fs.readFileSync("./cache.json", "utf8"));

    if(cache.giveaway.active) return message.reply(`There is already active giveaway there! It is in guild \`${client.guilds.get(cache.giveaway.guild).name}\`, channel <#${cache.giveaway.channel}>. Time was set is ${cache.giveaway.time} hours. Item to giveaway was \`${cache.giveaway.item}\` with ${cache.giveaway.winners} winners`);
    //patterns
    let patterns = {'hourly500': {'time': 1, 'item': '500 hourly dank memer coins', 'winners': 1}};

    //fill cache function

    async function fillcache(active, gid, chid, hours, item, cacheobject, mid, wnrs) {
        cacheobject.giveaway.active = active;
        cacheobject.giveaway.guild = gid;
        cacheobject.giveaway.channel = chid;
        cacheobject.giveaway.time = hours;
        cacheobject.giveaway.item = item;
        cacheobject.giveaway.mid = mid;
        cacheobject.giveaway.winners = wnrs

        await fs.writeFile("./cache.json", JSON.stringify(cacheobject), (err) => {if (err) console.log(err)});
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
            await fillcache(true, message.guild.id, message.channel.id, hours, item, cache, msg.id, winners);
            await msg.react('🎉');

            setTimeout(async function() {
                if(!cache.giveaway.active) return;

                await fillcache(false, "guild id", "channel id", "hours", "item to win", cache, "message id", "amount of winners");

                let reacted = msg.reactions.filter(rx => rx.emoji.name === '🎉').first().users.array();
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
                await msg.edit(ended);

                msg.channel.send('Congratulations, ' + won + ', you won ' + item)
            }, hours*3600000);
        })
    }


    if(!args[0]) return message.reply(usage);

    message.delete();


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

    else if(args[0] === 'end') {
        if(!cache.giveaway.active) return message.reply("There is no currently running giveaway.");

        let channel = client.channels.get(cache.giveaway.channel);
        if(!channel) return;

        let gmsg = channel.fetchMessage(cache.giveaway.mid);
        if(!gmsg) return;

        let winners = cache.giveaway.winners;
        let item = cache.giveaway.item;



        await fillcache(false, "guild id", "channel id", "hours", "item to win", cache, "message id", "amount of winners");

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

        gmsg.channel.send('Congratulations, ' + won + ', you won ' + item)
    }

    else return message.reply(usage)
};