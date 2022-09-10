const { InteractionType } = require("discord-api-types/v9");

module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) return;
		const request = interaction.client.autocompleteInteractions.get(interaction.commandName);

		if (!request) return;

		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}
	}
};
