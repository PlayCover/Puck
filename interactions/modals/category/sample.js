module.exports = {
	id: 'sample',
	async execute(interaction) {
		await interaction.reply({
			content: 'This was a reply from modal handler!'
		});
	}
};
