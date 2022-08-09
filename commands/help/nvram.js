module.exports = class nvram extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'nvram', 
            description: 'Setup Boot Arguments',
            options: [
                { 
                    name: 'user',
                    description: 'User to ping in reply',
                    type: 'USER',
                    required: false
                }
            ]
        })
    }

    /**
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async run(interaction) {
        let user = interaction.options.getUser('user');
        
        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: user,
            embeds: [
                this.client.src.embed()
                    .setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
                    .setTitle('How to input the recommended nvram boot-args:')
                    .setDescription(`   
                        ➤ **Command + Space** on your keyboard
                        ➤ Type **Terminal**
                        ➤ Type or copy+paste the following command:
                        \`\`\`sudo nvram boot-args="amfi_get_out_of_my_way=0x1 ipc_control_port_options=0"\`\`\`
                        ➤ Input your password
                        ➤ If it seems like nothing happened, **that's expected** and correct
                        ➤ Restart your mac
                        ➤ **Enjoy!**
                    `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}