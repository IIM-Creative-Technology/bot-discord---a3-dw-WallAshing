const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Discord.CommandInteraction} interaction  // To use if your want your command to also be a slash command
 * @param {Array<String>} arguments
 */


module.exports.run = async (client, interactionOrMessage, arguments) => {
    if(interactionOrMessage instanceof Discord.CommandInteraction){
        await interactionOrMessage.reply('On my way to crusade this criminal scum');

    } if(interactionOrMessage instanceof Discord.Message) {
        await interactionOrMessage.channel.send("On my way to crusade this criminal scum")
    } else return;
};

module.exports.name = 'crusade';
