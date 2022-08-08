module.exports = class HelpCommand extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'help', 
            description: 'View the help message'
        })
    }

    /**
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async run(interaction) {
        return interaction.reply({
            embeds: [
                this.client.src.embed().setTitle('SEND HELP PLEASE NOW')
            ],
            ephemeral: true
        }).catch(() => null);
    }
}