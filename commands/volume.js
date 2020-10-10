const discord = require ("discord.js")

module.exports.run = async(bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("There is no song playing right now.");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You are not in the music channel");

    if(isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.reply("Please give a number between 0 - 150");

    guildIDData.dispatcher.setVolume(args[0] / 100);

    return message.channel.send(`volume changed to: ${args[0]}`);

}

module.exports.help = {
    name: "volume"
}