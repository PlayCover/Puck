const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('codesign')
		.setDescription('How to fix "PlayCover" cannot be opened')
		.addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
		let user = interaction.options.getUser('user');

		return interaction
			.reply({
				content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
				allowedMentions: { users: [user ? user.id : null] },
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
						.setTitle('How to fix "PlayCover" cannot be opened')
						.setDescription(
							`   
                        ➤ **Command + Space** on your keyboard
                        ➤ Type **Terminal**
                        ➤ Type or copy+paste the following command:
                        \`\`\`codesign --force --deep --sign - /Applications/PlayCover.app\`\`\`
                        ➤ Make sure the only output is:
                        \`\`\`/Applications/PlayCover.app: replacing existing signature\`\`\`
                        ➤ **Enjoy!**
                        ➤ *If you are having issues or just want to ask questions, you can always go to <#1019859452352020540> for help!*  
                    `
						)
						.setColor('Random')
				],
				ephemeral: user ? false : true
			})
			.catch(error => console.error(`[ERROR]: ${error}`));
	}
};
