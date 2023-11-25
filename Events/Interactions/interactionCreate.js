const { isChatInputCommandInteraction, Collection } = require('discord.js');
const { client } = require("../../index.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) 
      return interaction.reply({
        content: "\`\`\`[ERROR] Command outdated.\`\`\`",
        ephemeral: true
      });
    

    const { cooldowns, config } = client;

    if (command.developer && interaction.user.id != config.devId)
    return interaction.reply({
      content: "\`\`\`[DENIED] Command only available to the developer.\`\`\`",
      ephemeral: true
    });


    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection())
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: `\`\`\`[COOLDOWN] Command '${command.data.name}' has ${expiredTimestamp}ms left.\`\`\``,
          ephemeral: true
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`[ERROR] Executing Command '${interaction.commandName}' failed.`);
      console.error(error);
    }
  },
};