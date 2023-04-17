const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('solved').setDescription('Close a post once it has been solved'),
	async execute(interaction) {
		interaction.channel.ownerId === interaction.user.id ? interaction.channel.delete() : interaction.reply({ content: 'You can only delete your own posts.', ephemeral: true });
	}
};
