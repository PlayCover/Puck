module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[CLIENT] Logged in as ${client.user.tag}!` );
        status(client);
        
        client.guilds.fetch(process.env.GUILD).then(guild => {
            guild.channels.fetch('1006080822215966741').then(channel => {
                channel.setName(`User Count: ${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`));
            }).catch(e => console.error(`[ERROR]: ${e}`));
        })
	}
};

function status(client) {
    setInterval(() => {
        let key = [
            { type: 'WATCHING', data: 'people not read FAQ' },
            { type: 'WATCHING', data: 'devs push back releases' },
            { type: 'PLAYING', data: 'PlayCover' },
            { type: 'PLAYING', data: 'with Emilia 🌸' },
            { type: 'PLAYING', data: 'with depression' },
        ];
        let rand = key[Math.floor(Math.random() * key.length)];

        client.user.setPresence({ status: 'online', activities: [ { name: rand.data, type: rand.type } ] });
    }, 5 * 60000);
    setTimeout(() => client.user.setPresence({ status: 'online', activities: [ { name: '/help', type: 'WATCHING' } ] }), 60000);
};