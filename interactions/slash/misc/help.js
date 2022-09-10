const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot or info about a specific command.")
		.addStringOption(option => option.setName("command").setDescription("The specific command to see the info of.")),

	async execute(interaction) {
		let name = interaction.options.getString("command");
		const helpEmbed = new EmbedBuilder().setColor("Random");

		if (name) {
			name = name.toLowerCase();
			helpEmbed.setTitle(`Help for \`${name}\` command`);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);
				if (command.data.description) helpEmbed.setDescription(command.data.description + "\n\n**Parameters:**");
			} else {
				helpEmbed.setDescription(`No slash command with the name \`${name}\` found.`).setColor("Red");
			}
		} else {
			helpEmbed
				.setTitle("List of all my slash commands")
				.setDescription("`" + interaction.client.slashCommands.map((command) => command.data.name).join("`, `") + "`");
		}

		await interaction.reply({
			embeds: [helpEmbed]
		});
	}
};
