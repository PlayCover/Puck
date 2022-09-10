require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
	]
});


client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.modalCommands = new Collection();
client.autocompleteInteractions = new Collection();

try {
    const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on( event.name, async (...args) => await event.execute(...args, client));
        }
    }
    console.log('[CLIENT] All Events Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

try {
    const slashCommands = fs.readdirSync('./interactions/slash');

    for (const module of slashCommands) {
        const commandFiles = fs.readdirSync(`./interactions/slash/${module}`).filter((file) => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const command = require(`./interactions/slash/${module}/${commandFile}`);
            client.slashCommands.set(command.data.name, command);
        }
    }
    console.log('[CLIENT] All Slash Commands Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

try {
    const autocompleteInteractions = fs.readdirSync('./interactions/autocomplete');

    for (const module of autocompleteInteractions) {
        const files = fs.readdirSync(`./interactions/autocomplete/${module}`).filter((file) => file.endsWith('.js'));

        for (const interactionFile of files) {
            const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
            client.autocompleteInteractions.set(interaction.name, interaction);
        }
    }
    console.log('[CLIENT] All Autocomplete Interactions Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

const buttonCommands = fs.readdirSync('./interactions/buttons');

for (const module of buttonCommands) {
	const commandFiles = fs.readdirSync(`./interactions/buttons/${module}`).filter((file) => file.endsWith('.js'));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

try {
    const modalCommands = fs.readdirSync('./interactions/modals');

    for (const module of modalCommands) {
        const commandFiles = fs.readdirSync(`./interactions/modals/${module}`).filter((file) => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const command = require(`./interactions/modals/${module}/${commandFile}`);
            client.modalCommands.set(command.id, command);
        }
    }
    console.log('[CLIENT] All Modal Interactions Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

try {
    const selectMenus = fs.readdirSync('./interactions/select-menus');

    for (const module of selectMenus) {
        const commandFiles = fs.readdirSync(`./interactions/select-menus/${module}`).filter((file) => file.endsWith('.js'));
        for (const commandFile of commandFiles) {
            const command = require(`./interactions/select-menus/${module}/${commandFile}`);
            client.selectCommands.set(command.id, command);
        }
    }
    console.log('[CLIENT] All Select Menus Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), { body: [...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON())] });
		console.log('[CLIENT] All Slash Commands Registered.');
	} catch (error) { console.error(`[ERROR] ${error}`) }
})();

client.login(process.env.TOKEN);
