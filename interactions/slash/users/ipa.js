const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('appocalypse')
		.setDescription('Get the link to the Appocalypse server')
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

	async execute(interaction) {
        let user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                    .setTitle('Click here to join Appocalypse server')
                    .setURL('https://discord.gg/8SXCXbzzBe/')
                    .setAuthor({ name: 'Appocalypse: Decrypted IPAs'})
                    .setColor('Random')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`));
    }
};