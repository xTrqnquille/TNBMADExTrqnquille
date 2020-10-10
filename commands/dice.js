const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    var result = Math.ceil(Math.random() * 6);

    message.channel.send(`:game_die: You threw **${result}** :game_die:`);

}

module.exports.help = {
    name: "dice"
}