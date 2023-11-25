const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
    .addUserOption(option => option.setName('target').setDescription('The target of information').setRequired(false)),
	async execute(interaction, client) {

    const target = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id);
    const icon = target.displayAvatarURL({dynamic:true});
    const tag = target.tag;
    
    const { info } = client.config.color;
		const embed = new EmbedBuilder()
			.setColor(info)
			.setTitle(`${tag}'s Profile`)
      .setDescription(`ID: ${target.id}`)
      .setThumbnail(icon)
			.addFields({ name:"Roles", value: `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`, inline: false })
      .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true })
      .addFields({ name: "Joined Discord", value: `<t:${parseInt(target.createdTimestamp / 1000)}:R>`, inline:true })
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic:true}) })
      .setTimestamp();
      
		
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply({ embeds: [embed] });
	},
};