const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    try{

        var text = "**TeaNetwork** \n\n **-=Commands=-** \n `!hello` - sends a hello message back \n `!help` - this page \n `!ticket` - Make a ticket \n `!new` - Make a ticket \n `!ip` - Shows The server IP \n\n **-=DiscordGames=-** \n `!rps [Rock, Scissors, Paper]` - And look if you have won! \n\n **-=StaffCommands=-** \n `!announcement [Title] [Announcement]` - Do a announcement \n `!kick [PLayer] [Reason]` - Kick a member from the discord \n `!ban [Player] [Reason]` - ban a member from the discord \n `!tempmute [Player] [time]` - tempmute a player \n `!clear [Amount]` - clear the chat";

        message.author.send(text);

        message.reply("I have send all the commands in your PM")

    }catch(error){
        message.reply("There is a Error Please Contact the Developer")
    }

}

module.exports.help = {
    name: "help"
}