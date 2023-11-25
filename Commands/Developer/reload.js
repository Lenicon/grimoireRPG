const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client
} = require('discord.js');

const {loadCommands} = require("../../Handlers/commandHandler");
const {loadEvents} = require("../../Handlers/eventHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads commands/events.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((option) => options
      .setName("events")
      .setDescription("Reload events."))
    .addSubcommand((options) => options
      .setName("commands")
      .setDescription("Reload commands.")),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client
   */
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch(subCommand) {
      case "event" : {
        for(const [key, value] of client.events)
        client.removeListener(`${key}`, value, true);
        loadEvents(client);
        await interaction.reply({content: "[SUCCESS] Events reloaded.", ephemeral: true});
      }
      break;
      case "command" : {
        loadCommands(client);
        await interaction.reply({content: "[SUCCESS] Commands reloaded.", ephemeral: true});
      }
      break;
    }
  },
};