module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot || message.channel.type === 'DM') return;
	}
};
