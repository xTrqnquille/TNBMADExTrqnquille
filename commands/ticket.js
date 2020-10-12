const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    const catergoryID = "764406900858814466"

    var username = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == username.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("U heeft al een ticket");

            return;
        }
        
    });

    if (ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Goededag " + message.author.username)
        .setFooter("Ticket gemaakt");

    message.channel.send(embed);

    message.guild.channels.create(username.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(catergoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id,{
                        SEND_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        CONNECT: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                    .setTitle(`Goededag ${message.author.username}`)
                    .setDescription("Bedankt voor uw Ticket, ons Staff-Team zal u zo snel mogelijk helpen. \n Stel uw vraag, en binnen 24 uur krijgt u een antwoord! \n Veel succes!")
                    .setFooter(`Datum`)
                    .setColor("PURPLE")
                    .setTimestamp()

                settedParent.send(embedParent);
                }
            ).catch(err => {
                message.channel.send("Er is een fout");
            });
        }
    ).catch(err => {
        message.channel.send("Er is een fout");
    });

}

module.exports.help = {
    name: "ticket"
}