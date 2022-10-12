const {
    ChannelType
  } = require('discord.js');

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (!message.author.bot && message.channel.type === 'dm') {
            await message.reply('uh oh');
          } else if (message.channelId === '1028895351236735017') {
            const regex = new RegExp(/test/i);
        
            if (
              message.channel.type === ChannelType.GuildText &&
              !message.author.bot &&
              message.content.match(regex)
            ) {
              console.log(`${message.author.tag}: ${message.content}`);
        
              await message.reply('a test message');
            }
          }
    }
}

