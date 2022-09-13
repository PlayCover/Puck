const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('docs')
		.setDescription('Get the link to the PlayCover Documentation (PlayBook)')
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        let user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: user,
            embeds: [
                new EmbedBuilder()
                    .setTitle('Click here to open PlayBook')
                    .setURL('https://docs.playcover.io/')
                    .setAuthor({ name: 'PlayCover Documentation'})
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor('Random')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`));
    }
};