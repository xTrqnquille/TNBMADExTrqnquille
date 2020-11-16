const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    var catergoryid = "764406900858814466";
    var staff = "764406953483960321";
    var person = message.author;

    var channelName = "Sollicitatie-" + message.author.username;

    var ticket = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name.toLowerCase() === channelName.toLowerCase()){
            ticket = true;
            return message.reply("U heeft al een ticket.").then(msg => msg.delete({timeout: 3000 }));
        }
    });

    if (ticket) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Goedendag" + message.author.username)
        .setColor("PURPLE")
        .setDescription("Kanaal word aangemaakt.");

    message.channel.send(embed).then(msg => msg.delete({timeout: 3000 }));

    message.guild.channels.create(channelName, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(catergoryid).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        SEND_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CONNECT: true,
                        READ_MESSAGES_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.get(staff), {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true,
                        READ_MESSAGES_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle("Goedendag" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Welkom bij uw sollicitatie! er komen hier een aantal vragen en zou u zo vrindelijk willen zijn om deze in te vullen");
                    
                    var Naam = new discord.MessageEmbed()
                        .setTitle("Naam" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Wat is Uw naam?");

                    var Leeftijd = new discord.MessageEmbed()
                        .setTitle("Leeftijd" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Wat is Uw Leeftijd?");

                    var MineCraftNaam = new discord.MessageEmbed()
                        .setTitle("MineCraftNaam" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Wat is Uw MineCraftNaam?");

                    var Functie = new discord.MessageEmbed()
                        .setTitle("Functie" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Voor welke Functie solliciteert u?");

                    var WaaromJij = new discord.MessageEmbed()
                        .setTitle("Waarom" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Waarom wilt u hier werken?");

                    var Motivatie = new discord.MessageEmbed()
                        .setTitle("Motivatie" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Wat is Uw Motivatie om hier te werken?");

                    var PlusEnMin = new discord.MessageEmbed()
                        .setTitle("+/-" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Plus en min punten");

                    var Verdereaanvullingen = new discord.MessageEmbed()
                        .setTitle("Verdere Aanvullingen" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Heeft u nog Verdere Aanvullingen?");

                    var vragen = new discord.MessageEmbed()
                        .setTitle("Vragen" + message.author.username)
                        .setColor("PURPLE")
                        .setDescription("Heeft u nog vragen voor de staff leden?");

                    settedParent.send(message.author.id);
                    settedParent.send(embedParent);
                    settedParent.send(Naam);

                    settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                        var antwoord1 = antwoord.first();;
                        settedParent.send(Leeftijd);

                        settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                            var antwoord2 = antwoord.first();;
                            settedParent.send(MineCraftNaam);

                            settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                var antwoord3 = antwoord.first();;
                                settedParent.send(Functie);

                                settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                    var antwoord4 = antwoord.first();;
                                    settedParent.send(WaaromJij);

                                    settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                        var antwoord5 = antwoord.first();;
                                        settedParent.send(Motivatie);

                                        settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                            var antwoord6 = antwoord.first();;
                                            settedParent.send(PlusEnMin);

                                            settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                                var antwoord7 = antwoord.first();;
                                                settedParent.send(Verdereaanvullingen);

                                                settedParent.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                                                    var antwoord8 = antwoord.first();;
                                                    settedParent.send(vragen);
                                                    

                                                    var uitkomst = new discord.MessageEmbed()
                                                        .setTitle("Bedankt voor de sollicitatie!")
                                                        .setColor("PURPLE")
                                                        .setTimestamp()
                                                        .setDescription(`**Naam:** \n${antwoord1} \n**Leeftijd:** \n${antwoord2}\n**MineCraftNaam:** \n${antwoord3}\n**Functie:** \n${antwoord4}\n**WaaromJij:** \n${antwoord5}\n**Motivatie:** \n${antwoord6}\n**+/- Punten:** \n${antwoord7}\n**Verdereaanvullingen:** \n${antwoord8}\n**vragen:** \n${antwoord8}`);
                                                    
                                                    settedParent.bulkDelete(14).then(
                                                        settedParent.send(uitkomst)
                                                    )
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                    
                    settedParent.send(`${person}, <@&${staff}>`).then(msg => msg.delete({ timeout: 1000 }));

                }).catch(err => {
                    message.channel.send("Er ging iets fout.")
                });
        })

}

module.exports.help = {
    name: "sollicitatie"
}