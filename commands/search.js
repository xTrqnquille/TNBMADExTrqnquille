const search = require ("yt-search");

module.exports.run = async(client, message, args, options) => {

    search(args.join(" "), function (error, respone) {

        if (error) return message.channel.send("There is a error Please contact the Developer.");

        var videos = respone.videos.slice(0, 10);

        var respone = "";

        for(var vid in videos) {
            respone += `**[${parseInt(vid) + 1}]:** ${videos[vid].title} \r\n`;
        }

        respone += `Choose a Number inside 0 and ${videos.length}.`;

        message.channel.send(respone);
        
        const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

        const collection = messgae.channel.createMessageCollector(filter);

        collection.videos = videos;
        
        collection.once("collect", function (music) {

            var commandFile = require("./play.js");

            commandFile.run(client, message, [this.videos[parseInt(music.content) - 1].url], options);

        });
    });

}

module.exports.help = {
    name: "search"
}