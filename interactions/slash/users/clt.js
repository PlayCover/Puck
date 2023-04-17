const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clt')
		.setDescription('How to install Xcode Command Line Tools')
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
						.setTitle('How to install Xcode Command Line Tools')
						.setDescription(
							`   
                        ➤ **Command + Space** on your keyboard
                        ➤ Type **Terminal**
                        ➤ Type or copy+paste the following command:
                        \`\`\`xcode-select --install\`\`\`
                        ➤ Input your password
                        ➤ Press \`install\` and agree to the terms and conditions
                        ➤ The install time you will see is very misleading, it should take from 10 to 60 minutes depending on your internet connection.  
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
