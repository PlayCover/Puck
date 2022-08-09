module.exports = class keymap extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'keymap', 
            description: 'Keymapping FAQ and premade keymaps',
            options: [
                { name: 'Genshin Impact', type: 'SUB_COMMAND', required: false },
                { name: 'Honkai Impact 3rd', type: 'SUB_COMMAND', required: false },
                { name: 'Diablo Immortal', type: 'SUB_COMMAND', required: false },
                { name: 'League of Legends: Wildrift', type: 'SUB_COMMAND', required: false },
                { name: 'Punihsing Grey Raven', type: 'SUB_COMMAND', required: false },
                { name: 'user', description: 'User to ping in reply', type: 'USER', required: false }
            ]
        })
    }

    /**
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async run(interaction) {
        let sub = interaction.options.getSubCommand(true);
        let user = interaction.options.getUser('user');

        let genshin = interaction.options.getString('Genshin Impact');
        let honkai = interaction.options.getString('Honkai Impact 3rd');
        let diablo = interaction.options.getString('Diablo Immortal');
        let wildrift = interaction.options.getString('League of Legends: Wildrift');
        let pgr = interaction.options.getString('Punihsing Grey Raven');
        
        let embed = this.client.src.embed()
            .setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
            .setTitle('Keymapping FAQ')
            .setDescription(`
                [~ 'Command (CMD) + K' — Toggle keymapping mode ~]

                **Button Events:**
                ➤ 'Clicking on the screen' — Opens a menu to add a button element.
                ➤ In this menu, the following prompts allow you to add specific buttons:
                > 'Clicking on "LB"' — Bind left mouse button.
                > 'Clicking on "RB"' — Bind right mouse button.
                > 'Clicking on' ":mouse_three_button:" — Bind middle mouse button
                > 'Clicking on' ":heavy_plus_sign:" — Adds a W/A/S/D Joystick
                > 'Clicking on' ":arrows_counterclockwise:" — Adds a Mouse Area

                **Flow Control:**
                ➤ 'Command (CMD) + '↑'' — Increase the selected buttons size
                ➤ 'Command (CMD) + '↓'' — Decrease the selected buttons size
                ➤ 'Command (CMD) + Delete (Backspace)' — Delete the selected keymapping
                ➤ 'Press option (⌥)' — Toggle between show/hide cursor
            `)

        switch (sub) {
            case 'Genshin Impact':
                break;
        
            case 'Honkai Impact 3rd':
                break;

            case 'Diablo Immortal':
                break;

            default:
                break;
        }

        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: user,
            embeds: [
                this.client.src.embed()
                    .setTitle('How to flawlessly input your nvram boot-args:')
                    .setDescription(`
                        •➤ **Command + Space** on your keyboard
                        •➤ Type **Terminal**
                        •➤ Type or copy+paste the following command:
                        \`\`\`sudo nvram boot-args="amfi_get_out_of_my_way=0x1 ipc_control_port_options=0"\`\`\`
                        •➤ Input your password
                        •➤ If it seems like nothing happened, **that's expected** and correct
                        •➤ Restart your mac
                        •➤ **Enjoy!**
                    `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}