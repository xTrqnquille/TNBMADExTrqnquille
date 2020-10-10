const discord = require ("discord.js")

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You have no permissions for that");
 
    if (!args[0]) return message.reply("how many messages do you want to clear?");
 
    if (Number.isInteger(parseInt(args[0]))) {
 
        var amount = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(amount).then(() => { 
 
            if (args[0] == 0) {
 
                message.reply(`Are you stupid I can't delete 0 messages?`).then(msg => msg.delete({timeout: 3000}));
            
            } else if (args[0] == 1) {
            
                message.reply(`I deleted 1 message.`).then(msg => msg.delete({timeout: 3000}));
            
            } else {
            
                message.reply(`I deleted ${args[0]} messages.`).then(msg => msg.delete({timeout: 3000}));
            
            }
 
        });
 
    } else {
        return message.reply("Please enter a number.");
    }

}

module.exports.help = {
    name: "clear"
}