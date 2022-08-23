
module.exports = class docs extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'docs', 
            description: 'Get the link to the PlayCover Documentation (PlayBook)',
            options: [
                { name: 'user', description: 'User to ping in reply', type: 'USER', required: false }
            ]
        })
    }

    /**
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async run(interaction) {
        let user = interaction.options.getUser('user', false);
        
        return interaction.reply({
            content: user ? user.toString() : null,
            embeds: [
                this.client.src.embed()
                    .setTitle('Here\'s the link to the Documentation:')
                    .setURL('https://docs.playcover.io/')
                    .setAuthor({ name: 'PlayCover Documentation'})
                    .setDescription(`
                        [] - https://docs.playcover.io/
                    `)
                    .setThumbnail('https://media.discordapp.net/attachments/918283668659793950/1010696286070124544/final_00000.png')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}
