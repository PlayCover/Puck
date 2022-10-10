module.exports = {
	id: 'deleteMessage',
	async execute(interaction) {
		await interaction.message.delete();
	}
};
