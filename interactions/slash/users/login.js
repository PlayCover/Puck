const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('login')
		.setDescription('Get the link to the TroubleShoot App Login Issues on PlayBook')
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        let user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                    .setTitle('Click here to learn How to Troubleshoot Login Issues')
                    .setURL('https://docs.playcover.io/getting_started/troubleshoot_login')
                    .setAuthor({ name: 'PlayCover Documentation'})
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor('Random')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`));
    }
}