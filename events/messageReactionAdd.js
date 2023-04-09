const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction) {
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				return console.error('[ERROR] Something went wrong when fetching the message: ', error);
			}
		}
		if (reaction.emoji.name != '⭐') return;
		if (reaction.message.channel.id == '1044494377264894042') return;

		if (reaction.count == 3) {
			reaction.message.guild.channels.fetch('1044494377264894042').then(channel => {
				channel.send({
					embeds: [
						new EmbedBuilder()
							.setAuthor({ name: reaction.message.author.username, iconURL: reaction.message.author.avatarURL() })
							.setDescription(reaction.message.content?.substring(0, 2048) || null)
							.setImage(reaction.message.attachments.first()?.contentType.includes('image') ? reaction.message.attachments.first().url : null)
							.addFields({ name: 'Source', value: `[Jump to message](${reaction.message.url})` })
							.setTimestamp()
							.setColor('Random')
					],
					files: reaction.message.attachments?.map(a => (a.contentType.includes('image') ? null : a.url))
				});
			});
		}
	}
};
