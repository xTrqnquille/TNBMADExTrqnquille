const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    if (!args[0]) return message.reply("Use <Rock, Paper, Scissors>")

    var options = ["Rock", "Paper", "Scissors"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "ROCK") {

        if(result == "Scissors") {

        return message.channel.send(`I got ${result} :notepad_spiral:, I WON GG!`);

    } else if(result == "Paper") {

        return message.channel.send(`I got ${result} :scissors:, You WON GG!`);

    } else if(result == "Rock") {

        return message.channel.send(`I got ${result} :moyai:, it's a tie GG!`);

        }
    
    }

else if (args[0].toUpperCase() == "PAPER") {

        if(result == "Paper") {

        return message.channel.send(`I got ${result} :notepad_spiral:, it's a tie GG!!`);

    } else if(result == "Scissors") {

        return message.channel.send(`I got ${result} :scissors:, I WON GG!`);

    } else if(result == "Rock") {

        return message.channel.send(`I got ${result} :moyai:, You WON GG!`);

        }
    
    }

    else if (args[0].toUpperCase() == "SCISSORS") {

        if(result == "Scissors") {

        return message.channel.send(`I got ${result} :notepad_spiral:, !`);

    } else if(result == "Scissors") {

        return message.channel.send(`I got ${result} :scissors:, I WON GG!`);

    } else if(result == "Rock") {

        return message.channel.send(`I got ${result} :moyai:, You WON GG!`);

        }
    
    }

}




module.exports.help = {
    name: "rps"
}