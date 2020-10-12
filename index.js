const discord = require ("discord.js")
const botConfig = require("./botconfig.json");

const activeSongs = new Map();

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();
client.login(botConfig.token);

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("No files found")
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`File ${f} Loaded`)

        client.commands.set(fileGet.help.name, fileGet);

    });


});

client.on("ready", async () => {

    console.log(`${client.user.username} is online. `);
    client.user.setActivity("!Help", {type: 'Playing'});

});

client.on("messageDelete", messageDeleted => {

    if(messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if(!content) content = "No Tekst Found";

    var respone = `Message: ${messageDeleted.id} Is Deleted by channel: ${messageDeleted.channel} \n **Message:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({size:4096})}`)
        .setDescription(respone)
        .setTimestamp()
        .setFooter(" © TeaNetwork • Date")
        .setColor("PURPLE");

    client.channels.cache.find(c => c.name == "log").send(embed);
});

client.on("guildMemberAdd", member => {
 
    var role = member.guild.roles.cache.get('764408213679636502');
 
    if (!role) return;

    member.roles.add(role);

    const channel = member.guild.channels.cache.get('764400179226345484');
 
    if (!channel) return;
 
    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`New Member`, member.user.displayAvatarURL)
        .setDescription(`**Welcome**
        *${member.user.username}*  To **TeaNetwork**
        
        • Website: #*SOON*
        • Server: #*SOON*
        • Contact Us: TeaNetwork0@gmail.com`)
        .setColor("PURPLE")
        .setFooter(" © TeaNetwork • Joined at ")
        .setTimestamp();

    channel.send(joinEmbed);
 
});

var swearWords = ["Kanker","https://", "KKR", "kkr", "Tering", "Kut", "kanker","kk","k4nker", "kut", "ashole", "cancer", "Cancer", "tering", "GVD", "gvd",]

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;


    var msg = message.content.toLocaleLowerCase();

    for (let i = 0; i < swearWords.length; i++){

        if(msg.includes(swearWords[i])){

            message.delete();

            return message.reply("Dit Alstublieft niet zeggen.").then(msg => msg.delete({ timeout: 3000 }));
        }
        
    }


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];


    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    var options = {
        active: activeSongs
    };

    if(commands) commands.run(client, message, arguments, options);


    });

client.login(process.env.token);