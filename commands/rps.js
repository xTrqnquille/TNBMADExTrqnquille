const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    if (!args[0]) return message.reply("Gebruik <Steen, Papier, Schaar>")

    var options = ["Steen", "Papier", "Schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "STEEN") {

        if(result == "Schaar") {

        return message.channel.send(`Ik Heb ${result} :scissors:, Jij wint GG!`);

    } else if(result == "Papier") {

        return message.channel.send(`Ik Heb ${result} :notepad_spiral:, Ik win GG!`);

    } else if(result == "Steen") {

        return message.channel.send(`Ik Heb ${result} :moyai:, Het is gelijk spel GG!!`);

        }
    
    }

else if (args[0].toUpperCase() == "PAPIER") {

        if(result == "Papier") {

        return message.channel.send(`Ik heb ${result} :notepad_spiral:, Het is gelijk spel GG!!`);

    } else if(result == "Schaar") {

        return message.channel.send(`Ik heb ${result} :scissors:, Ik win GG!`);

    } else if(result == "Steen") {

        return message.channel.send(`Ik heb ${result} :moyai:, Jij wint GG!`);

        }
    
    }

    else if (args[0].toUpperCase() == "SCHAAR") {

        if(result == "Schaar") {

        return message.channel.send(`Ik heb ${result} :scissors:, Het is gelijk spel GG!!`);

    } else if(result == "Steen") {

        return message.channel.send(`Ik heb ${result} :moyai:, Ik win GG!`);

    } else if(result == "Papier") {

        return message.channel.send(`Ik heb ${result} :notepad_spiral:, Jij wint GG!`);

        }
    
    }

}




module.exports.help = {
    name: "sps"
}