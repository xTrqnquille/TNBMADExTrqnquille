const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    var item = "";
    var Time;
    var winnerCount;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you can't use that command.");

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(" ");

    if(!winnerCount) return message.reply("No number of players specified");
    if(!Time) return message.reply("No time specified");
    if(!item) return message.reply("No item specified");

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed= new discord.MessageEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`Ends: ${dateEnd}`)
        .setDescription(item);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function(){

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if(peopleReacted[i].id === clientInformation.user.id){
                peopleReacted.splice(i,1);
                continue;
            }

        }

        if(peopleReacted.length == 0){
            return message.channel.send("No body have joined the giveaway")
        }

        if(peopleReacted.length < winnerCount) {
            return message.channel.send("there are not enough people who joined so no one won")
        }

        for (let y = 0 ; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {
                
                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
                
            } 

            if(!inList){
                winners.push(peopleReacted[random]);
            }
            
        }

        for (let y = 0; y < winners.length; y++) {

            message.channel.send("**Winner:** " + winners[y].username + `You have won ${item}`);
            
        }

    }, time * 1000)

    


}

module.exports.help = {
    name: "giveaway"
}