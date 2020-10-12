const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    const catergoryID = "764406900858814466"

    var reason = args.slice(2).join(" ");

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You Can't use that command.");

    if (message.channel.parentID == catergoryID) {
        message.channel.delete();
}else {

    message.channel.send("Please do this command in a ticket.");
    
    }

    var embedCreateTicket = new discord.MessageEmbed()
        .setTitle("Ticket, " + message.channel.name)
        .setDescription(`Ticket Closed • Closed by: ${message.author} • Reason: ${reason} `)
        .setFooter(" © TeaNetwork • Ticket Closed • Close Date:")
        .setTimestamp();

    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
    if (!ticketChannel) return message.reply("channel **log** is not created please create a channel named **log**")

    ticketChannel.send(embedCreateTicket);
}

module.exports.help = {
    name: "close"
}