const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The command to reload.')
        .setRequired(true)),
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply(`\`\`\`[ERROR] Command '${commandName}' not found.\`\`\``);
    }

    delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

    try {
          interaction.client.commands.delete(command.data.name);
          const newCommand = require(`../${command.category}/${command.data.name}.js`);
          interaction.client.commands.set(newCommand.data.name, newCommand);
          await interaction.reply(`\`\`\`[200] Command '${newCommand.data.name}' reloaded.\`\`\``);
    } catch (error) {
          console.error(error);
          await interaction.reply(`\`\`\` Command '${command.data.name}' failed to reload:\n${error.message}\`\`\``);
    }
  },
};