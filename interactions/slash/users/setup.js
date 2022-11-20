const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('How to setup Genshin Impact in PlayCover')
        .addUserOption(option => option.setName('user').setDescription('User to ping in reply')),

    async execute(interaction) {
        let user = interaction.options.getUser('user');

        return interaction.reply({
            content: user ? `${user.toString()}, ${interaction.member.toString()} wanted you to see this command` : null,
            allowedMentions: { users: [user ? user.id : null] },
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Requested by: ${interaction.member.nickname}`, iconURL: interaction.user.avatarURL() })
                    .setTitle('How to setup Genshin Impact in PlayCover')
                    .setDescription(`   
                        **1. Disable SIP**
                        ➤ This can be done by shutting down your mac, holding down power button
                        ➤ After this, click on your username/ssd, then keep going until you can see \`Utilities\` at the top
                        ➤ When you see this, click on it and click on \`Terminal\`
                        ➤ After this, you should be in a terminal window
                        ➤ Type \`csrutil disable\` in that terminal window
                        ➤ It will ask for your mac username, type it and press return
                        ➤ Then if will ask for that user's password, type it and press return
                        ➤ Your password will not be shown on screen, so don't panic!
                        ➤ Click on Apple logo on the top and Restart your mac
                        **2. Allow the nvram boot-args**
                        ➤ When you have SIP Disabled (this command only works with SIP disabled), do the following steps:
                        ➤ *Command + Space*; type "Terminal" in the search box
                        ➤ It should open a normal terminal window
                        ➤ Type the following in this window (or copy paste it)
                        \`\`\`sudo nvram boot-args="amfi_get_out_of_my_way=1"\`\`\`
                        ➤ If it appears that nothing has happened, this is correct.
                        ➤ **Now restart your Mac once again**
                        **3. Login to Genshin**
                        ➤ Open Genshin Impact with PlayCover, and you should be greeted with a **Login** button
                        ➤ Login to your account, then wait until the door appears and quit the game with **Command + Q**
                        ➤ Thats all which is required in Genshin for now
                        **4. Enable SIP Again**
                        ➤ Shut down your Mac again
                        ➤ Hold down the power button until you get to recovery options
                        ➤ Click on your username and your storage disk respectively like you did for step 1.
                        ➤ You should see \`Utilities\` at the top
                        ➤ Click on it, and Click on \`Terminal\`
                        ➤ In terminal, type the following: \`csrutil enable\`
                        ➤ \`csrutil clear\` should also work
                        ➤ Reboot your Mac by going to Apple Logo>Restart
                        **5. Open Genshin**
                        ➤ You're done! Enjoy playing genshin!
                        ➤ *If you are having issues or just want to ask questions, you can always go to <#1019859452352020540> for help!*  
                    `)
                    .setColor('Random')
            ],
            ephemeral: user ? false : true
        }).catch(error => console.error(`[ERROR]: ${error}`));
    }
};