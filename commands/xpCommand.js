const Discord = require('discord.js');
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Discord.CommandInteraction} interaction  // To use if your want your command to also be a slash command
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, interactionOrMessage, arguments) => {
    if(interactionOrMessage instanceof Discord.CommandInteraction){
        connection.query("SELECT * FROM players WHERE user_id = " + interactionOrMessage.author.id, (err, result) => {
            if (err) throw err;
            if (result){
                interactionOrMessage.reply("You are level: " + result[0].xp_level + "\n You have: " + result[0].xp_count)
                console.log('test')
            } else {
                interactionOrMessage.reply("You are level: 0 \n You have: 0xp")
                console.log('test')

            }

        })
    } 
    if(interactionOrMessage instanceof Discord.Message) {
        connection.query("SELECT * FROM players WHERE user_id = " + interactionOrMessage.author.id, (err, result) => {
            if (err) throw err;
            if (result){
                interactionOrMessage.channel.send("You are level: " + result[0].xp_level + "\n You have: " + result[0].xp_count)
                console.log('test')
            } else {
                interactionOrMessage.channel.send("You are level: 0 \n You have: 0xp")
                console.log('test')
            }

        })
    } else return;
};

module.exports.name = 'xp';
