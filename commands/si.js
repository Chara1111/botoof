let commandFile = require(`./serverinfo.js`);

exports.run = (client, message, args) => {
    commandFile.run(client, message, args)
};

exports.help = commandFile.help;