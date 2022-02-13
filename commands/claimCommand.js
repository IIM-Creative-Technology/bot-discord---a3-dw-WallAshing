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
                if (result[0].xp_level > 0){
                    if (result[0].xp_level >= 5){
                        if (result[0].xp_level >= 10){
                            if (result[0].xp_level >= 20){
                                if (result[0].xp_level >= 30){
                                    const roleName = "MafiaBoss"
                                    const xpRole = await interactionOrMessage.guild.roles.create({
                                        name:"MafiaBoss",
                                        color:"DARK_RED",
                                    })
                                    const Embed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle('Role claimed')
                                        .setImage(interactionOrMessage.author.displayAvatarURL())
                                        .addFields(
                                            { name: 'Your rôle is : ', value: roleName, inline: true },
                                        )
                                    await interactionOrMessage.member.roles.add(xpRole)
                                    await interactionOrMessage.reply(Embed)

                                }else {
                                    const roleName = "Bebou"
                                    const xpRole = await interactionOrMessage.guild.roles.create({
                                        name:"Bebou",
                                        color:"LUMINOUS_VIVID_PINK",
                                    })
                                    const Embed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle('Role claimed')
                                        .setImage(interactionOrMessage.author.displayAvatarURL())
                                        .addFields(
                                            { name: 'Your rôle is : ', value: roleName, inline: true },
                                        )
                                    await interactionOrMessage.member.roles.add(xpRole)
                                    await interactionOrMessage.reply(Embed)

                                }
                            } else {
                                const roleName = "level 10+"
                                const xpRole = await interactionOrMessage.guild.roles.create({
                                    name:"level 10+",
                                    color:"LUMINOUS_VIVID_PINK",
                                })
                                const Embed = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('Role claimed')
                                    .setImage(interactionOrMessage.author.displayAvatarURL())
                                    .addFields(
                                        { name: 'Your rôle is : ', value: roleName, inline: true },
                                    )
                                await interactionOrMessage.member.roles.add(xpRole)
                                await interactionOrMessage.reply(Embed)

                            }
                        } else {
                            const roleName = "Pepite de choucoulate"
                            const xpRole = await interactionOrMessage.guild.roles.create({
                                name:"Pepite de choucoulate",
                                color:"GREYPLE",
                            })
                            const Embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Role claimed')
                                .setImage(interactionOrMessage.author.displayAvatarURL())
                                .addFields(
                                    { name: 'Your rôle is : ', value: roleName, inline: true },
                                )
                            await interactionOrMessage.member.roles.add(xpRole)
                            await interactionOrMessage.reply(Embed)
                                    
                        }
                    } else {
                        const roleName = "level 1 Crook"
                        const xpRole = await interactionOrMessage.guild.roles.create({
                            name:"level 1 Crook",
                            color:"AQUA",
                        })
                        const Embed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('Role claimed')
                            .setImage(interactionOrMessage.author.displayAvatarURL())
                            .addFields(
                                { name: 'Your rôle is : ', value: roleName, inline: true },
                            )
                        await interactionOrMessage.member.roles.add(xpRole)
                        await interactionOrMessage.reply(Embed)

                    }
                } else {
                    const roleName = "no role for you"
                    const Embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Role claimed')
                        .setImage(interactionOrMessage.author.displayAvatarURL())
                        .addFields(
                            { name: 'Your rôle is : ', value: roleName, inline: true },
                        )
                    await interactionOrMessage.member.roles.add(xpRole)
                    await interactionOrMessage.reply(Embed)


                }

            } else {
                const Embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Role not claimed')
                                .setImage(interactionOrMessage.author.displayAvatarURL())
                                .addFields(
                                    { name: 'Your rôle is : ', value: "Nothing", inline: true },
                                )
                await interactionOrMessage.member.roles.add(xpRole)
                await interactionOrMessage.reply(Embed)
            }
        })
    } if(interactionOrMessage instanceof Discord.Message) {
        connection.query("SELECT * FROM players WHERE user_id = " + interactionOrMessage.author.id, (err, result) => {
            if (err) throw err;
            if (result){
                if (result[0].xp_level > 0){
                    if (result[0].xp_level >= 5){
                        if (result[0].xp_level >= 10){
                            if (result[0].xp_level >= 20){
                                if (result[0].xp_level >= 30){
                                    const roleName = "MafiaBoss"
                                    const xpRole = await interactionOrMessage.guild.roles.create({
                                        name:"MafiaBoss",
                                        color:"DARK_RED",
                                    })
                                    const Embed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle('Role claimed')
                                        .setImage(interactionOrMessage.author.displayAvatarURL())
                                        .addFields(
                                            { name: 'Your rôle is : ', value: roleName, inline: true },
                                        )
                                    await interactionOrMessage.member.roles.add(xpRole)
                                    await interactionOrMessage.send(Embed)

                                }else {
                                    const roleName = "Bebou"
                                    const xpRole = await interactionOrMessage.guild.roles.create({
                                        name:"Bebou",
                                        color:"LUMINOUS_VIVID_PINK",
                                    })
                                    const Embed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle('Role claimed')
                                        .setImage(interactionOrMessage.author.displayAvatarURL())
                                        .addFields(
                                            { name: 'Your rôle is : ', value: roleName, inline: true },
                                        )
                                    await interactionOrMessage.member.roles.add(xpRole)
                                    await interactionOrMessage.send(Embed)

                                }
                            } else {
                                const roleName = "level 10+"
                                const xpRole = await interactionOrMessage.guild.roles.create({
                                    name:"level 10+",
                                    color:"LUMINOUS_VIVID_PINK",
                                })
                                const Embed = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('Role claimed')
                                    .setImage(interactionOrMessage.author.displayAvatarURL())
                                    .addFields(
                                        { name: 'Your rôle is : ', value: roleName, inline: true },
                                    )
                                await interactionOrMessage.member.roles.add(xpRole)
                                await interactionOrMessage.send(Embed)

                            }
                        } else {
                            const roleName = "Pepite de choucoulate"
                            const xpRole = await interactionOrMessage.guild.roles.create({
                                name:"Pepite de choucoulate",
                                color:"GREYPLE",
                            })
                            const Embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Role claimed')
                                .setImage(interactionOrMessage.author.displayAvatarURL())
                                .addFields(
                                    { name: 'Your rôle is : ', value: roleName, inline: true },
                                )
                            await interactionOrMessage.member.roles.add(xpRole)
                            await interactionOrMessage.send(Embed)
                                    
                        }
                    } else {
                        const roleName = "level 1 Crook"
                        const xpRole = await interactionOrMessage.guild.roles.create({
                            name:"level 1 Crook",
                            color:"AQUA",
                        })
                        const Embed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('Role claimed')
                            .setImage(interactionOrMessage.author.displayAvatarURL())
                            .addFields(
                                { name: 'Your rôle is : ', value: roleName, inline: true },
                            )
                        await interactionOrMessage.member.roles.add(xpRole)
                        await interactionOrMessage.send(Embed)

                    }
                } else {
                    const roleName = "no role for you"
                    const Embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Role claimed')
                        .setImage(interactionOrMessage.author.displayAvatarURL())
                        .addFields(
                            { name: 'Your rôle is : ', value: roleName, inline: true },
                        )
                    await interactionOrMessage.member.roles.add(xpRole)
                    await interactionOrMessage.send(Embed)


                }

            } else {
                const Embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Role not claimed')
                                .setImage(interactionOrMessage.author.displayAvatarURL())
                                .addFields(
                                    { name: 'Your rôle is : ', value: "Nothing", inline: true },
                                )
                await interactionOrMessage.member.roles.add(xpRole)
                await interactionOrMessage.send(Embed)
            }
        })
    } else return;
};

module.exports.name = 'claim';
