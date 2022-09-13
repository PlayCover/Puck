// const { WebhookClient, Collection } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (message.author.bot || message.channel.type === 'DM') return;
        if (message.content.includes(`<@${message.client.user.id}>`) || message.content.includes(`<@!${message.client.user.id}>`)) message.channel.send((message.content.replace('<@1000077833550434304>', message.author.toString())).toUpperCase());
        if (message.content === '(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B') message.reply('\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)');

        if (message.content.startsWith(':') && message.content.endsWith(':') && message.content !== '::') {
            let emoji = message.guild.emojis.cache.find(c => c.name.toLowerCase().includes(message.content.replace(/:/g, '').toLowerCase()));
    
            if (emoji) {
                await message.delete().catch(() => null);

                if (message.channel.id === '1002027980664602705') return; // remove after emoji suggestion channel gone
                
                let hook = await findOrCreateWebhook(message);

                if (hook) {
                    return hook.send({
                        content: emoji.toString(),
                        username: message.member.displayName,
                        avatarURL: message.member.displayAvatarURL({ format: 'png' }),
                        allowedMentions: { parse: [] }
                    }).catch(() => null);
                }
            }
        }

        // remove after emoji suggestion channel gone
        if (message.channel.id === '1002027980664602705') {
            if (message.content.startsWith('<') && message.content.endsWith('>') && message.content.includes(':')) {
                message.react('⬆️');
            } else if (message.content.includes('cdn.discordapp.com') || message.content.includes('emojis')) {
                message.react('⬆️');
            } else {
                message.delete();
            }
        }
	}
};

const findOrCreateWebhook = async (message) => {
    const create = async () => { return message.channel.createWebhook({ name: `[${message.client.user.username}]: Nitro Mockup` }).catch(() => null); }

    let hook = await message.channel.fetchWebhooks().then(webhook => { return webhook.find(w => w.name === `[${message.client.user.username}]: Nitro Mockup`); });

    if (hook) {
        return hook;
    } else {
        return create();
    }
};