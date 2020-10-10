const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You need Permissions for that command!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("No Perms");
    
    if (!args[1]) return message.reply("No user Selected.");

    if (!args[2]) return message.reply("No Reason Selected.");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2).join(" ");

    if(!banUser) return message.reply("User not found");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setTitle("You got 30 Seconds to react")
        .setThumbnail(`https://i.imgur.com/8V0b6RZ.jpg`)
        .setTimestamp()
        .setFooter(`© xTrqn Development`, `https://i.imgur.com/8V0b6RZ.jpg`)
        .setDescription(`Do you want to ban ${banUser}?`);

    var embed = new discord.MessageEmbed()
        .setColor("#8a2be2")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setThumbnail(`https://i.imgur.com/8V0b6RZ.jpg`)
        .setFooter(`© xTrqn Development`, `https://i.imgur.com/8V0b6RZ.jpg`)
        .setDescription(`**Banned: ** ${banUser} (${banUser.id})
        ** Banned By: ** ${message.author}
        ** Reason: ** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅") {

            msg.delete();

            banUser.ban(reason).catch(err => {
                if (err) return message.reply("There is a Error!");
            });

            message.channel.send(embed);

        } else if(emoji === "❌") {

            msg.delete();

            message.reply("Ban canceled").then(m => m.delete(5000));

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