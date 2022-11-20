const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const stableAndPre = new AttachmentBuilder('./resources/stable.png');
const nightly = new AttachmentBuilder('./resources/nightly.png');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('download')
        .setDescription('Get the download link for PlayCover')
        .addStringOption(option => option.setName('release').setDescription('The release of PlayCover you want to download').setRequired(true).addChoices({ name: 'Stable', value: 'stable' }, { name: 'Pre-Release', value: 'pre-release' }, { name: 'Nightly', value: 'nightly' }))
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

    async execute(interaction) {
        var title, description, thumbnail, file;
        const release = interaction.options.getString('release');
        const user = interaction.options.getUser('user');
        const releaseData = await fetch('https://api.github.com/repos/playcover/playcover/releases').then(res => res.json())

        switch (release) {
            case 'stable':
                title = 'Stable';
                description = `[Click here to download](${releaseData.filter(release => release.prerelease === false)[0].assets[0].browser_download_url})`;
                thumbnail = 'attachment://stable.png';
                file = stableAndPre;
                break;
            case 'pre-release':
                title = 'Pre-Release';
                description = `[Click here to download](${releaseData.filter(release => release.prerelease === true)[0].assets[0].browser_download_url})`;
                thumbnail = 'attachment://stable.png';
                file = stableAndPre;
                break;
            case 'nightly':
                title = 'Nightly';
                description = `[Click here to download](https://nightly.link/playcover/playcover/workflows/2.nightly_release/develop?status=completed)`;
                thumbnail = 'attachment://nightly.png';
                file = nightly;
                break;
        }

        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setThumbnail(thumbnail)
                    .setColor("Random")
            ],
            ephemeral: user ? false : true,
            files: [file]
        }).catch(error => console.error(`[ERROR]: ${error}`))
    }
};