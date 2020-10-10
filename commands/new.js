const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    const catergoryID = "764406900858814466"

    var username = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == username.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("You already have a ticket");

            return;
        }
        
    });

    if (ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setFooter("Ticket Created");

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
                    .setTitle(`Hi ${message.author.username}`)
                    .setDescription("Thanks for your support, our Staff-Team will help you as soon as possible. \n Ask your question, and in 24 hours, you hopefully get an answer! \n Greetings!")
                    .setFooter(`Date`)
                    .setColor("PURPLE")
                    .setTimestamp()

                settedParent.send(embedParent);
                }
            ).catch(err => {
                message.channel.send("There is a Error contact the Developer for more information");
            });
        }
    ).catch(err => {
        message.channel.send("There is a Error contact the Developer for more information");
    });

}

module.exports.help = {
    name: "new"
}