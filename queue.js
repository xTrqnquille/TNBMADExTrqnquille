const discord = require ("discord.js")

module.exports.run = async(client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("There is no song playing right now.");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Now Playing: ${nowPlaying.songTitle} || Requested by: ${nowPlaying.requester}. \n\n queue: \n`;

    for (let index = 0; index < queue.length; index++) {
        
        response += `${index}, ${queue[index].songTitle} Requested by: ${queue[index].requester}.`;

    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue"
}