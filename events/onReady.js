const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[CLIENT] Logged in as ${client.user.tag}!`);
		status(client);

		client.guilds.fetch(process.env.GUILD).then(guild => {
			guild.channels
				.fetch('1006080822215966741')
				.then(channel => {
					channel.setName(`User Count: ${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`));
				})
				.catch(e => console.error(`[ERROR]: ${e}`));
		});
	}
};

function status(client) {
	setInterval(() => {
		let key = [
			{ type: ActivityType.Watching, data: 'people not read FAQ' },
			{ type: ActivityType.Watching, data: 'devs push back releases' },
			{ type: ActivityType.Playing, data: 'PlayCover' },
			{ type: ActivityType.Playing, data: 'with roeegh' },
			{ type: ActivityType.Playing, data: 'with depression' }
		];
		let rand = key[Math.floor(Math.random() * key.length)];

		client.user.setPresence({ activities: [{ name: rand.data, type: rand.type }] });
	}, 5 * 60000);
	setTimeout(() => client.user.setPresence({ activities: [{ name: '/help', type: ActivityType.Watching }] }), 60000);
}
