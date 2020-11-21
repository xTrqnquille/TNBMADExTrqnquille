const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    var catergoryid = "764406900858814466";

    var ticketUser = message.guild.member(message.mentions.users.first());

    if (message.channel.parentID !== catergoryid) return message.reply("Dit is geen ticket!") && message.delete();

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij kan dit niet doen.") && message.delete();

    if (!ticketUser) return message.reply("Geef een persoon op") && message.delete();

    var kiesEmbed = new discord.MessageEmbed()
        .setTitle("Kies")
        .setColor("PURPLE")
        .addField(`Aangenomen:`, '✅', false)
        .addField(`Afgewezen:`, '❌', false);

    var redenEmbed = new discord.MessageEmbed()
        .setTitle("Reden")
        .setColor("PURPLE")
        .addField(`Reden:`, 'Vertel een reden.', false);

    message.channel.send(kiesEmbed).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

    if (emoji === "✅") {

            message.channel.send(redenEmbed).then(msg => msg.delete({ timeout: 10000 }));

            message.channel.awaitMessage(filter, { max: 1, time: 10000 }).then(collected => {

                var redenGood = collected.first();

                var antwoordGood = new discord.MessageEmbed()
                    .setTitle("Aangenomen")
                    .setColor("PURPLE")
                    .addField("Wie:", `${ticketUser}`, false)
                    .addField("Reden:", `${redenGood}`, false)

                message.channel.send(antwoordGood);
                message.channel.bulkDelete(1);
                message.channel.setTopic(`**Sollicitatie**: ${ticketUser} **Status**: Aangenomen!🎉`);

            })

        }else if (emoji === "❌") {

            message.channel.send(redenEmbed).then(msg => msg.delete({ timeout: 10000 }));

            message.channel.awaitMessage(filter, { max: 1, time: 10000 }).then(collected => {

                var redenBad = collected.first();

                var antwoordGood = new discord.MessageEmbed()
                    .setTitle("Afgewezen")
                    .setColor("PURPLE")
                    .addField("Wie:", `${ticketUser}`, false)
                    .addField("Reden:", `${redenBad}`, false)

                message.channel.send(antwoordGood);
                message.channel.bulkDelete(1);
                message.channel.setTopic(`**Sollicitatie**: ${ticketUser} **Status**: Afgewezen!😢`);

            })
            
        }

    })

}

module.exports.help = {
    name: "uitslag"
}