let options = [{
            name: 'info',
            description: 'Information about the keymapping system',
            type: 'SUB_COMMAND',
            options: [
                { 
                    name: 'user',
                    description: 'User to ping in reply',
                    type: 'USER',
                    required: false
                }
            ]
        }];
require('../../resources/keymaps.json').forEach(game => options.push({ name: game.tag, description: `Keymap for ${game.name}`, type: 'SUB_COMMAND', options: [{ name: 'user', description: 'User to ping in reply', type: 'USER', required: false }] }));

module.exports = class keymap extends require('../base') {
    constructor(client) {
        super(client, {
            name: 'keymap', 
            description: 'Keymapping FAQ and premade keymaps',
            options
            // options: [
            //     {
            //         name: 'info',
            //         description: 'Information about the keymapping system',
            //         type: 'SUB_COMMAND',
            //         options: [
            //             { 
            //                 name: 'user',
            //                 description: 'User to ping in reply',
            //                 type: 'USER',
            //                 required: false
            //             }
            //         ]
            //     },
            //     { 
            //         name: 'list', 
            //         description: 'List of premade keymaps by the community', 
            //         type: 'SUB_COMMAND_GROUP', 
            //         options
            //     }
            // ]
        })
    }

    /**
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    async run(interaction) {
        let user = interaction.options.getUser('user');
        let embed = this.client.src.embed().setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
        let choice = require('../../resources/keymaps.json').filter(game => game.tag.toLowerCase() == interaction.options.getSubcommand(true).toLowerCase());
        
        if (choice.length != 0) {
            return interaction.reply({
                content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
                allowedMentions: user,
                embeds: [
                    embed.setTitle(`${choice[0].name} Keymap`)
                    .setDescription(`[Download Here](https://${choice[0].url})`)
                ],
                ephemeral: user ? false : true
            }).catch(error => console.error(`[ERROR]: ${error}`.red));
        }

        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: user,
            embeds: [
                embed.setTitle('Keymapping FAQ')
                .setDescription(`
                    ➤ \`Command (CMD) + K\` — Toggle keymapping mode

                    **Button Events:**
                    ➤ \`Clicking on the screen\` — Opens a menu to add a button element.
                    ➤ In this menu, the following prompts allow you to add specific buttons:

                    > \`Clicking on 'LB'\` — Bind left mouse button.
                    > \`Clicking on 'RB'\` — Bind right mouse button.
                    > \`Clicking on\` ':mouse_three_button:' — Bind middle mouse button
                    > \`Clicking on\` ':heavy_plus_sign:' — Adds a W/A/S/D Joystick
                    > \`Clicking on\` ':arrows_counterclockwise:' — Adds a Mouse Area

                    **Flow Control:**
                    ➤ \`Command (CMD) + '↑'\` — Increase the selected buttons size
                    ➤ \`Command (CMD) + '↓'\` — Decrease the selected buttons size
                    ➤ \`Command (CMD) + Delete (Backspace)\` — Delete the selected keymapping
                    ➤ \`Press option (⌥)\` — Toggle between show/hide cursor
                `)
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`.red));
    }
}