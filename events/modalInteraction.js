const { InteractionType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",
    async execute(interaction) {
		if (interaction.type !== InteractionType.ModalSubmit) return;
		const command = interaction.client.modalCommands.get(interaction.customId);
        
        if (!command) await require("../messages/defaultModalError").execute(interaction);

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while understanding this modal!",
				ephemeral: true
			});
		}
	}
};
