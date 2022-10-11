const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	id: 'apply',
	async execute(interaction) {
        interaction.guild.channels.fetch('1016871677591830578').then(channel => {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.user.tag}'s Moderator Application`)
                        .addFields(
                            { name: 'Prefered Name', value: interaction.fields.getTextInputValue('name'), inline: false },
                            { name: 'Timezone', value: interaction.fields.getTextInputValue('timezone'), inline: false },
                            { name: 'Active Hours', value: interaction.fields.getTextInputValue('hours'), inline: false },
                            { name: 'Reason', value: interaction.fields.getTextInputValue('reason'), inline: false }
                        )
                        .setColor('Random')
                        .setTimestamp()
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('deleteMessage')
                                .setLabel('Delete')
                                .setStyle(ButtonStyle.Danger)
                        ),
                ]
            })
        })
		await interaction.reply({
			content: 'Your application has been submitted!',
            ephemeral: true
		});
	}
};
