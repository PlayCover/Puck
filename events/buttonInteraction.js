const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",
    async execute(interaction) {
		if (interaction.type !== InteractionType.MessageComponent) return;
		if (interaction.componentType !== ComponentType.Button) return;

		const command = interaction.client.buttonCommands.get(interaction.customId);
        if (!command) await require("../messages/defaultButtonError").execute(interaction);

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that button!",
				ephemeral: true
			});
		}
	}
};
