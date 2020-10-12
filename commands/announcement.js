const discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
 
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U moet Permissions hebben voor dat command!");
 
    var seperator = "|";
 
    if (args[0] == null) {
        var embed = new discord.MessageEmbed()
            .setTitle("Use")
            .setColor("#00ee00")
            .setDescription(`Maak een mededeling door gebruik te maken van: \n !mededeling Title ${seperator} Bericht ${seperator} Kleur ${seperator} `);
 
        return message.reply(embed);
    }
 
    var argsList = args.join(" ").split(seperator);
 
    console.log(argsList);
 
    if (argsList[2] == undefined) argsList[2] = "PURPLE";
    if (argsList[3] == undefined) argsList[3] = "📯⦒mededelingen";
 
    var options = {
 
        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud opgegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
 
    }
 
    console.log(options);
 
    var announceEmbed = new discord.MessageEmbed()
        .setTitle(`${options.titel}`)
        .setColor(options.kleur)
        .setThumbnail(`https://i.imgur.com/EU1zAXv.jpg`)
        .setFooter(`© TeaNetwork`, `https://i.imgur.com/EU1zAXv.jpg`)        
        .setDescription(`${options.bericht}`)
        .setFooter(`Verstuurd door: ${message.author.tag}`)
        .setTimestamp();
 
    var channel = message.member.guild.channels.cache.find(channel => channel.name === options.kanaal);
    if (!channel) return message.reply("Kanaal bestaat niet,");
 
    channel.send(announceEmbed);
 
}
 
module.exports.help = {
    name: "mededeling"
}