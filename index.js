const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  ChannelType,
} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.on('messageCreate', async (message) => {
  if (!message.author.bot && message.channel.type === 'dm') {
    await message.reply('uh oh');
  } else if (message.channelId === '1028895351236735017') {
    const regex1 = new RegExp(/pain/i);
    const regex2 = /ouch/i;
    const regex3 = /hurt/i;

    if (
      message.channel.type === ChannelType.GuildText &&
      !message.author.bot &&
      (message.content.match(regex1) ||
        message.content.match(regex2) ||
        message.content.match(regex3))
    ) {
      console.log(`${message.author.tag}: ${message.content}`);

      await message.reply('oussh me duele');
    }
  }
});

client.login(token);
