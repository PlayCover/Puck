module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: 'There was an issue while fetching this modal!',
			ephemeral: true
		});
	}
};
