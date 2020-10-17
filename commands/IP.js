const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    return message.channel.send("• Server: *TeaNetwork,mine.gg*");

}

module.exports.help = {
    name: "IP"
}