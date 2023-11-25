const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { info } = require('../config.json').color

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(info)
			.setTitle(interaction)
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({dynamic: true}) })

		
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};