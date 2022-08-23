module.exports = class clt extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'clt', 
            description: 'How to install Xcode Command Line Tools', 
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
        let user = interaction.options.getUser('user', false);

        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: user,
            embeds: [
                this.client.src.embed()
                    .setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
                    .setTitle('How to install Xcode Command Line Tools')
                    .setDescription(`   
                        ➤ **Command + Space** on your keyboard
                        ➤ Type **Terminal**
                        ➤ Type or copy+paste the following command:
                        \`\`\`xcode-select --install\`\`\`
                        ➤ Input your password
                        ➤ Press \`install\` and agree to the terms and conditions
                        ➤ The install time you will see is very misleading, it should take from 10 to 60 minutes depending on your internet connection.  
                        ➤ **Enjoy!**
                    `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}