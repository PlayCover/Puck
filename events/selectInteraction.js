module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;
		const command = interaction.client.selectCommands.get(interaction.customId);

		if (!command) {
			await interaction.reply({
				content: 'There was an issue while fetching this select menu option!',
				ephemeral: true
			});
		}

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'There was an issue while executing that select menu option!',
				ephemeral: true
			});
		}
	}
};
