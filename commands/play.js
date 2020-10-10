const discord = require ("discord.js");
const { validateURL } = require("ytdl-core");
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args, options) => {

    if(!message.member.voice.channel) return message.reply("Please connect in a speak channel");

    // if(message.guild.me.voice.channel) return message.channel.send("the bot is already connected to another voice channel");

    if(!args[0]) return message.reply("Please give a url");

    var validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("I cannot find this URL");

    var info = await ytdl.getInfo(args[0]);

    var data = options.active.get(message.guild.ID) || {};

    if(!data.connection) data.connection = await message.member.voice.channel.join();

    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({

        songTitle: info.videoDetails.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    
    });

    if(!data.dispatcher){
        Play(client, options, data);
    }else{
        message.channel.send(`Added song to queue ${info.videoDetails.title} | Requested By: ${message.author.tag}`);
    }

    options.active.set(message.guild.id, data);

}


async function Play(client, options, data) {

    client.channels.cache.get(data.queue[0].announceChannel).send(`Playing: ${data.queue[0].songTitle} - requested by: ${data.queue[0].requester}`);

    var options = { seek: 2, volume: 1 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function () {
        Finish(client, options, this);
    })

}

function Finish(client, options, dispatcher){

    var fetechedData = options.active.get(dispatcher.guildID);

    fetechedData.queue.shift();

    if(fetechedData.queue.length > 0){

        options.active.set(dispatcher.guildID, fetechedData);
        
        Play(client, options, fetechedData);

    }else{

        options.active.delete(dispatcher.guildID);

        var voiceChannel = client.guild.cache.get(dispatcher.guildID).me.voice.channel;

        if (voiceChannel) voiceChannel.leave();

    }
}

module.exports.help = {
    name: "play"
}