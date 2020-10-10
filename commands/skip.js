const discord = require ("discord.js")

module.exports.run = async(bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("There is no song playing right now.");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You are not in the music channel");

    if(message.member.hasPermission("KICK_MEMBERS")) {

        message.channel.send("On the way to the next song")

        return guildIDData.dispatcher.emit("finish");

    }

    var amountUsers = message.member.voice.channel.members.size;

    var amountSkip = Math.ceil(amountUsers / 2);

    if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if(guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send("you can only skip 1 time for each song");

    guildIDData.queue[0].voteSkips.push(message.member.id);
    options.active.set(message.guild.id, guildIDData);

    if(guildIDData.queue[0].voteSkips.length > amountSkip){

        message.channel.send("On the way to the next song")

        return guildIDData.dispatcher.emit("finish");

    }

    message.channel.send(`Song Added to skip request. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

}

module.exports.help = {
    name: "skip"
}