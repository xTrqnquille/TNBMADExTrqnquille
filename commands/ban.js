const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("U moet Permissions hebben voor dat command!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen Perms");
    
    if (!args[1]) return message.reply("Geen members gegeven.");

    if (!args[2]) return message.reply("Geen reden gegeven.");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2).join(" ");

    if(!banUser) return message.reply("Persoon niet gevonden");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setTitle("U heeft 30 seconden om te reageren")
        .setThumbnail(`https://i.imgur.com/EU1zAXv.jpg`)
        .setTimestamp()
        .setFooter(`© TeaNetwork`, `https://i.imgur.com/EU1zAXv.jpg`)
        .setDescription(`Wil jij ${banUser} Bannen?`);

    var embed = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setThumbnail(`https://i.imgur.com/8V0b6RZ.jpg`)
        .setFooter(`© xTrqn Development`, `https://i.imgur.com/8V0b6RZ.jpg`)
        .setDescription(`**Gebanned: ** ${banUser} (${banUser.id})
        ** Geband door: ** ${message.author}
        ** Reden: ** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅") {

            msg.delete();

            banUser.ban(reason).catch(err => {
                if (err) return message.reply("Er is een fout!");
            });

            message.channel.send(embed);

        } else if(emoji === "❌") {

            msg.delete();

            message.reply("Ban Geannuleerd").then(m => m.delete(5000));

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
    name: "ban"
}