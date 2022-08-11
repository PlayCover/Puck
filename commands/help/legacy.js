module.exports = class legacy extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'legacy', 
            description: 'Install legacy PlayCover for Arknights',
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
                    .setTitle('How to install the legacy version of PlayCover:')
                    .setDescription(`   
                        **[ Chapter 1 ]:**
                        ➤ Install PlayCover 0.9.2 from the following URL:
                        > https://github.com/PlayCover/PlayVault/blob/master/0.9.2.zip
                        ➤ Move the PlayCover application into the \`/Applications/\` Directory
                        **[ Chapter 2 ]:**
                        ➤ **Command + Space** on your keyboard
                        ➤ Type **Terminal**
                        ➤ Type or copy+paste the following commands:
                        \`\`\`chmod -R +x /Applications/PlayCover.app\`\`\`
                        \`\`\`xattr -cr /Applications/PlayCover.app\`\`\`
                        \`\`\`codesign --force --deep --sign - /Applications/PlayCover.app\`\`\`
                        **[ Chapter 3 ]:**
                        ➤ Shut down your mac and boot into Recovery
                        ➤ Disable your System Integrity Protection (SIP)
                        ➤ Boot back into the regular operating system
                        ➤ **Enjoy!**
                    `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}
