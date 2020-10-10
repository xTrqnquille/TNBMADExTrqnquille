const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    return message.channel.send("Pong :ping_pong: : " + (message.createdTimestamp - Date.now()) + " ms");

}

module.exports.help = {
    name: "ping"
}