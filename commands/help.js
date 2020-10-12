const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    try{

        var text = "**TeaNetwork** \n\n **-=Commands=-** \n `!Hallo` - Krijg een Hallo bericht terug \n `!help` - Deze pagina \n `!ticket` - Maak een ticket aan \n `!new` - Maak een ticket aan \n `!ip` - Laat het IP van de server zien \n\n **-=DiscordGames=-** \n `!sps [Steen, Schaar, Papier]` - En kijk als je gewonnen heb! \n\n **-=StaffCommands=-** \n `!mededelingen [Title] [Bericht] [Kleur] [Kanaal]` - Doe een mededeling \n `!kick [Speler] [Reden]` - Kick een members van de discord \n `!ban [Speler] [Reden]` - ban een member van de discord \n `!tempmute [Speler] [Tijd]` - tempmute een member \n `!clear [Aantal]` - clear de chat \n\n  © TeaNetwork";

        message.author.send(text);

        message.reply("Ik heb alle commands in uw Dm gestuurd.")

    }catch(error){
        message.reply("Er is iets fout gegaan")
    }

}

module.exports.help = {
    name: "help"
}