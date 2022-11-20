const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('textinput')
		.setDescription('How to add text into TextBoxes where you cannot type')
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        let user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
                    .setTitle('How to add text into TextBoxes')
                    .setDescription(`   
                        ➤ Open any app that has a textfield where you can copy.
                        ➤ Type the text you would like in the text box.
                        ➤ Select your text and copy it by pressing **Command** on your keyboard and **C** at the same time.
                        ➤ Open the app with issues again.
                        ➤ Click on the text box where you would like the text to be entered.
                        ➤ Press **Command + V** on your keyboard at the same time to paste the text.
                        ➤ **You're done!**
                        ➤ *If you are having issues or just want to ask questions, you can always go to <#1019859452352020540> for help!*  
                    `)
                    .setColor('Random')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`));
    }
};