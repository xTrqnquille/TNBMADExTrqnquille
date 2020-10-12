const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {


    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U Heeft Permissions voor dat command nodig");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen Permissions!");
    
    if (!args[1]) return message.reply("Geen **Gebruiker** Aangegeven.");

    if (!args[2]) return message.reply("Geen **Reden** Aangegeven.");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2).join(" ");

    if(!kickUser) return message.reply("Gebruiker niet gevonden");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setTitle("U heeft 30 seconden om te reageren")
        .setThumbnail(`https://i.imgur.com/8V0b6RZ.jpg`)
        .setTimestamp()
        .setFooter(`© TeaNetwork`, `https://i.imgur.com/EU1zAXv.jpg`)
        .setDescription(`Weet u zeker dat u ${kickUser} wilt kicken?`);

    var embed = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setThumbnail(`https://i.imgur.com/8V0b6RZ.jpg`)
        .setFooter(`© TeaNetwork`, `https://i.imgur.com/EU1zAXv.jpg`)
        .setDescription(`**Kicked: ** ${kickUser} (${kickUser.id})
        ** Gekicked door: ** ${message.author}
        ** Reden: ** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.reply("Er is een fout");
            });

            message.channel.send(embed);

        } else if(emoji === "❌") {

            msg.delete();

            message.reply("kick Geannuleerds").then(m => m.delete(5000));

        }
    });

}


async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction , user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}


module.exports.help = {
    name: "kick"
}