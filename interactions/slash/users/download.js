const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Get the download link for PlayCover')
        .addStringOption(option =>
            option.setName('nightly')
                .setDescription('Get the Nightly build download link')
                .addChoices(
                {
                    name: "true",
                    displayName: "true",
                    value: true
                }
            ))
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        const is_nightly = interaction.options.getString('nightly');
        const user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                .setTitle(is_nightly 
                    ? `Latest PlayCover Nightly Build` 
                    : 'Click here to go to PlayCover stable releases download page')
                .setDescription(is_nightly 
                    ? `[Click here to go to download page](https://nightly.link/PlayCover/PlayCover/workflows/2.nightly_release/develop)`
                    : 'https://github.com/PlayCover/PlayCover/releases')
                .setAuthor({ name: is_nightly 
                    ? 'Nightly.link'
                    : 'PlayCover GitHub'})
                .setThumbnail(interaction.guild.iconURL())
                .setColor("Random")
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`))
    }
};