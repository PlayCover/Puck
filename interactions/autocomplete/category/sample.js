module.exports = {
	name: "sample",
	async execute(interaction) {
		const focusedValue = interaction.options.getFocused();
		const filtered = choices.filter((choice) => choice.startsWith(focusedValue));

		await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
	}
};
