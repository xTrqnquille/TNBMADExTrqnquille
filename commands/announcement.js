const discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
 
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you can't do that command");
 
    var seperator = "|";
 
    if (args[0] == null) {
        var embed = new discord.MessageEmbed()
            .setTitle("Use")
            .setColor("#00ee00")
            .setDescription(`Make an announcement by using: \n !announcement Title ${seperator} Messgage ${seperator} Color ${seperator} `);
 
        return message.reply(embed);
    }
 
    var argsList = args.join(" ").split(seperator);
 
    console.log(argsList);
 
    if (argsList[2] == undefined) argsList[2] = "#eeeeee";
    if (argsList[3] == undefined) argsList[3] = "📯⦒mededelingen";
 
    var options = {
 
        titel: argsList[0],
        bericht: argsList[1] || "No content specified",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
 
    }
 
    console.log(options);
 
    var announceEmbed = new discord.MessageEmbed()
        .setTitle(`${options.titel}`)
        .setColor(options.kleur)
        .setDescription(`${options.bericht}`)
        .setFooter(`Message author: ${message.author.tag}`)
        .setTimestamp();
 
    var channel = message.member.guild.channels.cache.find(channel => channel.name === options.kanaal);
    if (!channel) return message.reply("Channel does not exist");
 
    channel.send(announceEmbed);
 
}
 
module.exports.help = {
    name: "announcement"
}