/**
 * @param {import('discord.js').Client} client 
 * @param {import('discord.js').Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    if(interaction.isCommand()) {
        let command = client.commands.get(interaction.commandName);
        if(!command) return;
        
        let cmd = await command.run(interaction);
        return cmd;
    }
}