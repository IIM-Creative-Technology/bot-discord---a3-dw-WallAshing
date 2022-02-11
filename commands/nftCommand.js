const Discord = require('discord.js');
const axios = require("axios")

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Discord.Interaction} interaction  // To use if your want your command to also be a slash command
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, interaction, arguments) => {
    const response = await axios.get("https://api.x.immutable.com/v1/collections/0x83f120283c30c796ebe9216ccaf6718c31213681", {
        headers: { 'Accept': 'application/json'}
    })
    
};

module.exports.name = 'nft';
