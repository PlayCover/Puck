module.exports = class nvram extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'nvram', 
            description: 'Setup Boot Arguments for logging in apps/games',
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
                    .setTitle('How to flawlessly input your nvram boot-args:')
                    .setAuthor({ name: 'Nvram boot-args Setup'})
                    .setDescription(`
                        [] - **Command + Space** on your keyboard
                        [] - Type **Terminal**
                        [] - Type or copy+paste the following command:
                        \`\`\`shsudo nvram boot-args="amfi_get_out_of_my_way=0x1 ipc_control_port_options=0"\`\`\`
                        [] - Input your password
                        [] - If it seems like nothing happened, **that's expected** and correct
                        [] - Restart your mac
                        [] - **Enjoy!**
                    `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}