var way = [
    "Jumping off a cliff.", /*1*/
    "Stepping on a lego.", /*2*/
    "Swallowing a lego.", /*3*/
    "Attacking a shibe inu. ", /*4*/
    "Jumping off a bridge.", /*5*/
    "Being dead.", /*6*/
    "Cursing in a catholic school.", /*7*/
    "Trying to steal the Krabby Patty formula.", /*8*/
    "Commiting suicide.", /*9*/
    "Using Macintosh.", /*10*/
    "Replacing the moon with a fidget spinner.", /*11*/
    "Being Hamilton.", /*12*/
    "Having your hard drive break.", /*13*/
    "Making memes about 1337.", /*14*/
    "Being sent to Gulag.", /*15*/
    "Being zent to ze concentrashon kamps.", /*16*/
    "Eating lunch from your school's cafeteria.",/*17*/
    "Not knowing what a computer is.", /*18*/
    "Not being able to read.", /*19*/
    "Accidentally prank-calling 911.", /*20*/
    "Removing net neutrality.", /*21*/
    "Being a teacher and using inspirational cat memes with impact font.", /*22*/
    "Not being able to read.", /*23*/
    "Living in North Korea.", /*24*/
    "Fighting off communist Vietnam.", /*25*/
    "Living in North Korea and believing propoganda.",/*26*/
    "Using Chromebooks.", /*27*/
    "Not having friends.", /*28*/
    "Thinking that a phone is a need and food is a want.", /*29*/
    "Playing the Soviet anthem at max volume.", /*30*/
    "Counting to 1 billion and being at the end but then losing track and having to restart.", /*31*/
    "Using a typewriter as your computer.", /*32*/
    "Accidentally breaking a rare photo at a museum.", /*33*/
    

];









// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`in ${client.guilds.size} servers. `);
});



function generateHex() {
    return "#" +Math.floor(Math.random()*16777215).toString(16);
}




var fortunes = [
    "I predict yes.",
    "My sources say no.",
    "I have no clue.",
    "Try asking again."

];







    

client.on("message", async message => {
   
    if(message.author.bot) return;
    
    
    if(message.content.indexOf(config.prefix) !== 0) return;
    
   
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    
    
    if(command === "ping") {
     
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if(command === "kick") {
        
        if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!");
        
        
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("Please mention a valid member of this server");
        if(!member.kickable) 
          return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        
        
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
       
        await member.kick(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    
      }

      if(command === "ban") {
        
        if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!");
        
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Please mention a valid member of this server");
        if(!member.bannable) 
          return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        await member.ban(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
      }

      if(command === "purge") {
        
        
        
        const deleteCount = parseInt(args[0], 10);
        
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        
       
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      }
    
    
      if(command === "8ball"){
            message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)])
         }
    
      if(command === "help"){
        var embed = new Discord.RichEmbed()
        .addField("Information", "Potatobot is a bot you don't need but'll still use. It was made on March 12, 2018 by potato.exe.")
        .addField("Commands", "pingpong, info, cmds, 8ball (What you want to ask), profile, way2die")
        
        .setColor(0x00FFFF)
        
        message.channel.sendEmbed(embed);
      }

      if(command === "userinfo"){
        var embed = new Discord.RichEmbed()
        .addField("Name", message.author.username)
        .addField("User ID", message.author.id)
        .setThumbnail(message.author.avatarURL)
        .setColor(0x00FFFF)
        .setFooter("Your user info")
        
    message.channel.sendEmbed(embed);

      }

      if(command === "way2die"){
        message.channel.sendMessage(way[Math.floor(Math.random() * way.length)])
      }
    
    });



        /*case "pingpong":
        message.channel.sendMessage("https://78.media.tumblr.com/tumblr_lfp90xpDTm1qb9w8so1_250.gif")
        break;

        case "info":
        message.channel.sendMessage("Potatobot Info :information_source: ``This is Potatobot, a bot you don't need but'll still use! To check available commands, type p.cmds. To get info on the bot, keep reading! This bot was made on 3/12/18 by an idiot called potato.exe with discord.js, or JavaScript. It is and will always be a WIP, even if it has all the features I want it to have. This isn't an open source bot, meaning the source code will not be uploaded anywhere and theres only 1 dev, me! Ok that's it.``")
        
        break;
        
        case "cmds":
        message.channel.sendMessage("Current Commands: ``pingpong`` , ``info`` , ``cmds`` , ``8ball (What you want to ask)`` , ``profile`` , ``way2die``")
        break;
        
        case "8ball":
        if (args[1]) {
            message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)])
        }   else {
            message.channel.sendMessage("Speak up, I can't hear you!!!")
        }
        break;
        
        case "profile":
        var embed = new Discord.RichEmbed()
                .addField("Name", message.author.username)
                .addField("User ID", message.author.id)
                .setThumbnail(message.author.avatarURL)
                .setColor(0x00FFFF)
                .setFooter("Info")
                
            message.channel.sendEmbed(embed);
        break;

        case "help":
        var embed = new Discord.RichEmbed()
        .addField("Information", "Potatobot is a bot you don't need but'll still use. It was made on March 12, 2018 by potato.exe.")
        .addField("Commands", "pingpong, info, cmds, 8ball (What you want to ask), profile, way2die")
        
        .setColor(0x00FFFF)
        
        message.channel.sendEmbed(embed);
        break;
    

        
            case "way2die":
            
                 message.channel.sendMessage(way[Math.floor(Math.random() * way.length)])
            
        
        break;
        
            
        
        default:
            message.channel.sendMessage(":x: Invalid command or syntax. Type ``p.help`` for commands.")
        
}*/


    




client.login(process.env.bot_token);
