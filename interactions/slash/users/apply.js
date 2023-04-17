const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('apply').setDescription('Apply to be a chat moderator'),

	async execute(interaction) {
		interaction
			.showModal(
				new ModalBuilder()
					.setCustomId('apply')
					.setTitle('Apply')
					.addComponents(
						new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('name').setLabel('Preferred Name').setPlaceholder('ex: Emelia').setStyle(TextInputStyle.Short)),
						new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('timezone').setLabel('Timezone').setPlaceholder('ex: GMT-6').setStyle(TextInputStyle.Short)),
						new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('hours').setLabel('Active Hours').setPlaceholder('ex: 8 AM - 5 PM').setStyle(TextInputStyle.Short)),
						new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('reason').setLabel('Briefly explain why do you want to be a mod?').setPlaceholder('ex: I want to help the community!').setMaxLength(1024).setStyle(TextInputStyle.Paragraph))
					)
			)
			.catch(error => console.error(`[ERROR]: ${error}`));
	}
};
