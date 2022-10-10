const { SlashCommandBuilder } = require('discord.js');

let count = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Replies with test!'),
  async execute(interaction) {
    count += 1;
    await interaction.reply(`${count} -> test!`);
  },
};
