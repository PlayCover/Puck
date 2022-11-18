const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Get the download link for PlayCover')
        .addStringOption(option =>
            option.setName('nightly')
                .setDescription('Get the Nightly build download link'))
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        let beta = interaction.options.getString('nightly');
        let user = interaction.options.getUser('user');
        
        if (beta) {
            return interaction.reply({
                content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
                allowedMentions: { users: [user ? user.id : null] },
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`Latest PlayCover Nightly Build`)
                    .setDescription(`[Click here to go to download page](https://nightly.link/PlayCover/PlayCover/workflows/2.nightly_release/develop)`)
                ],
                ephemeral: user ? false : true
            }).catch(error => console.error(`[ERROR]: ${error}`));
        } else {
            return interaction.reply({
                content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
                allowedMentions: { users: [user ? user.id : null] },
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Click here to go to PlayCover stable releases download page')
                        .setURL('https://github.com/PlayCover/PlayCover/releases')
                        .setAuthor({ name: 'PlayCover GitHub'})
                        .setThumbnail(interaction.guild.iconURL())
                        .setColor('Random')
                ],
                ephemeral: user ? false : true
            }).catch(error => console.error(`[ERROR]: ${error}`));
        }
    }
};