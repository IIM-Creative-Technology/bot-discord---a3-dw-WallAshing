const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Discord.Interaction} interaction  // To use if your want your command to also be a slash command
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, interaction, arguments) => {
  const channel = message.channel;

  await channel.send('Everything is working fine! :white_check_mark:');

  if (arguments.length > 0) {
    await channel.send('The provided arguments were: ' + arguments.join(', '));
  }
};

module.exports.name = 'test';
