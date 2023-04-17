const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('help').setDescription('List all commands of bot or info about a specific command.'),

	async execute(interaction) {
		await interaction
			.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('List of all my slash commands')
						.setDescription(`${interaction.client.slashCommands.map(command => `\`${command.data.name}\``).join(', ')}`)
						.setColor('Random')
				],
				ephemeral: true
			})
			.catch(error => console.error(`[ERROR]: ${error}`));
	}
};
