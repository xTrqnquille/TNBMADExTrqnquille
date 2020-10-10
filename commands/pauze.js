const discord = require ("discord.js")

module.exports.run = async(bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("There is no song playing right now.");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You are not in the music channel");

    if (guildIDData.dispatcher.paused) return message.channel.send("The Music is already on pause.")

    guildIDData.dispatcher.pause();

    return message.channel.send("Song paused.")

}

module.exports.help = {
    name: "pauze"
}