const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');
const mysql = require('mysql');
const { Client } = require('discord.js');
require('dotenv').config()
require('colors');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

const insultList = ['avorton', 'andouille', 'bridé', 'fell', 'dugland', 'bite', 'débougnouliser', 'bitembois', 'con comme un balai', 'empaffé', 'face de chien', 'con comme la lune', 'assimilé', 'Chinetoque', 'bulot', 'carcavel', 'glandouillou', 'abruti', 'charlot de vogue', 'croûton', 'bougnoulisation', 'connasse', 'bourricot', 'glandue', 'aller niquer sa mère', 'cacou', 'enfant de putain', 'glandeur', 'Fritz', 'conchier', 'conasse', 'complotiste', 'frisé', 'boukak', 'bête comme un cochon', 'fils de garce', 'enflure', 'empapaouté', 'épais', 'bouffon', 'aller se faire enculer', 'bâtard', 'chauffard', 'chintok', 'connard', 'con', 'fumelard', 'dago', 'bouffonne', 'charogne', 'con comme une chaise', 'bachi-bouzouk', 'chaoui', 'boudin', 'CPF', 'emmanché', 'face de pet', 'fritz', 'bounioul', 'bougnouliser', 'franco-frog', 'chinetoque', 'boucaque', 'enfant de garce', 'crouille', 'aller se faire foutre', 'fachiste', 'fripouille', 'Bougnoulie', 'duconnot', 'bête comme ses pieds', 'crouillat', 'gestapette', 'fils de bâtard', 'Bitembois', 'débile', 'chnoque', 'enculé', 'fils de ta race', 'folle', 'bourdille', 'bête comme un cygne', 'anglo-fou', 'garage à bites', 'crotté', 'enfant de salaud', 'aller se faire mettre', 'caldoche', 'étron', 'chienne', 'fiotte', 'colon', 'doryphore', 'contracibête', 'foutriquet', 'Gestapette', 'biatch', 'cheveux bleus', 'bougre', 'glandu', 'bête comme un chou', 'beauf', 'cafre', 'aller chier dans sa caisse', 'bic', 'fumier', 'bibi', 'con comme une valise', 'chien de chrétien', 'bête à pleurer', 'espingouin', 'emmerder', 'cave', 'fils de chien', 'chinetoc', 'Conchita', 'cageot', 'bougnoul', 'counifle', 'branleur', 'couille molle', 'chbeb', 'fils de pute', 'bridée', 'chiennasse', 'bique', 'espèce de', 'astèque', 'connarde', 'bouffi', 'envaselineur', 'courtaud', 'bellicole', 'dugenoux', 'FDP', 'garce', 'baraki', 'con comme une valise à poignée intérieure', 'espingoin', 'enfant de pute', 'ducon', 'empafé', 'fils de chienne', 'face de rat', 'casse-couille', 'cricri', 'conspirationniste', 'baudet', 'garage à bite', 'drouille', 'enculer', 'chier', 'bolos', 'assimilée', 'fermer sa gueule', 'emmerdeuse', 'boulet', 'brise-burnes', 'bête comme une oie', 'fouteur', 'enfant de fusil', 'con comme un manche', 'brigand', 'face de craie', 'bordille', 'casse-couilles', 'du schnoc', 'baleine', 'doxosophe', 'bicotte', 'doxosophie', 'bicot', 'bougnoule', 'aller se faire endauffer', 'glandeuse', 'bande d’abrutis', 'emmerdeur', 'gland', 'crétin', 'con comme une valise sans poignée', 'duschnock', 'con comme ses pieds', 'appareilleuse', 'chleuh', 'crevure', 'bounioule', 'enfoiré', 'crouïa', 'enculé de ta race', 'bourrer', 'gaupe', 'citrouille', 'envoyer faire foutre', 'bête', 'casse-bonbon', 'chieur', 'chagasse', 'chiabrena', 'coche', 'GDM', 'ratio']

const COMMAND_PREFIX = '!';

clientLoader.createClient(['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'])

  .then(async (client) => {
    await commandLoader.load(client);

    client.on("interactionCreate", async (interaction) => {
      if (interaction.author.bot) return;
      if (!interaction.isCommand()) return;
      
      const commandName = interaction.commandName

      if (client.commands.has(commandName)){
        client.commands.get(commandName).run(client, interaction, arguments);
      } else {
        await interaction.delete();
        await interaction.channel.send(`The ${commandName} does not exist.`);
      }
    })

    connection.connect((err) => {
      
      client.on('guildMemberAdd', async (member) => {
        connection.query("SELECT id FROM guild_list WHERE guild_id = " + member.guild.id, (err, result) => {
          if (err) throw err
          if (!result[0]){
            connection.query("INSERT INTO guild_list VALUES (0,  " + member.guild.id + ")", (err) => {if (err) throw err})
          }
        })
        connection.query("SELECT * FROM new_user_role WHERE guild_id = " + member.guild.id, async (err, result) => {
          if (err) throw err
          if (!result[0]){
            const NewUserRole = await member.guild.roles.create({
              name:"New user",
              color:"RANDOM",
              permissions: "0x0000000000000008",
              position: 1,
            })
            connection.query("INSERT INTO new_user_role VALUES (0, " + NewUserRole.id + ", 1 ," + member.guild.id + ")" , (err) => {
              if (err) throw err
              member.roles.add(NewUserRole)
            })
            
          } else {
            try {
              await member.roles.add(result[0].role_id)
            } catch (error) {
              connection.query("DELETE FROM new_user_role WHERE guild_id = " + member.guild.id, async (err) => {
                if (err) throw err
                const NewUserRole = await member.guild.roles.create({
                  name:"New user",
                  color:"RANDOM",
                  permissions: "0x0000000000000008",
                  position: 1,
                })
                connection.query("INSERT INTO new_user_role VALUES (0, " + NewUserRole.id + ", 1 ," + member.guild.id + " ) " , (err) => {
                  if (err) throw err
                  member.roles.add(NewUserRole)
                })
              })
            }
          }
        })          
      })

      client.on('messageCreate', async (message) => {
        // Ne pas tenir compte des messages envoyés par les bots
        if (message.author.bot) return;

        // Filtre d'insultes 

        insultList.forEach(insultwords => {
          const insultwordList = insultwords.split(" ")
          const messagewordList = message.content.split(" ")
          messagewordList.forEach(word =>{
            if (word == insultwords[0] && insultwords[1]){
              insultwordList.forEach(insult => {
                if (insult != word){
                  return
                }
              })
              message.delete()
            }
            if (word == insultwords[0] && !insultwords[1]){
              message.delete()
              
            }
          })
        })

        const userID = message.author.id
          
        if(err) throw err
        console.log("ça marche mon frérooooowwww")
        connection.query("SELECT * FROM players WHERE user_id = " + userID, (err, result) => {
          if (err) throw err
          if (result[0]){
            if (result[0].xp_count < (result[0].xp_level + 4) ){
              const increasedXpCount = result[0].xp_count + 1 
              connection.query("UPDATE players SET xp_count = " + increasedXpCount +" WHERE user_id = " + userID )
              console.log("xp increased")
            } else {
              const increasedXpLevel = result[0].xp_level + 1
              connection.query("UPDATE players SET xp_count = 0 ")
              connection.query("UPDATE players SET xp_level = " + increasedXpLevel +" WHERE user_id = " + userID )
              message.channel.send(message.author.username + " is now level : " + increasedXpLevel)
              console.log("level increased")
            }
          } else {
            connection.query("INSERT INTO players VALUES (0, " + userID + ", 0, 0)")  
            console.log("Player added")
          }
        })

        if (message.channel.name == "shared"){
          (await client.guilds.fetch()).forEach(async guild => {
            const theGuild = await guild.fetch();
            (await theGuild.channels.fetch()).forEach(async channel => {
              if(channel.name == "shared" && channel.id != message.channel.id){
                channel.send(message.content)
              }
            })
          })
        }

        if (!message.content.startsWith(COMMAND_PREFIX)) return;
        // On découpe le message pour récupérer tous les mots
        const words = message.content.split(' ');

        const commandName = words[0].slice(1); // Le premier mot du message, auquel on retire le préfix
        const arguments = words.slice(1); // Tous les mots suivants sauf le premier
        
        

        if (client.commands.has(commandName)) {
          // La commande existe, on la lance
          client.commands.get(commandName).run(client, message, arguments);
        } else {
          // La commande n'existe pas, on prévient l'utilisateur
          await message.delete();
          await message.channel.send(`The ${commandName} does not exist.`);
        }
      })
    })
  });
