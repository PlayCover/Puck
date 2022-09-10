module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`[CLIENT] Logged in as ${client.user.tag}!`);
	}
};
