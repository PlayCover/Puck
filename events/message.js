const { WebhookClient, Collection } = require('discord.js');

/**
 * @param {import('discord.js').Message} message 
 */
const findOrCreateWebhook = async (message) => {
    if(message.client.webhooks.has(message.channelId)) return message.client.webhooks.get(message.channelId);
    if(!message.channel.permissionsFor(message.client.user.id).has('MANAGE_WEBHOOKS')) return null;
    
    const create = async () => {
        return message.channel.createWebhook(`[${message.client.user.username}]: Nitro Mockup`).then(r => {
            message.client.webhooks.set(message.channelId, { url: r.url });
            return { url: r.url };
        }).catch(() => null);
    }
    
    /** 
     * @type {import('discord.js').Collection<string, import('discord.js').Webhook>} 
     */
    let hooks = (await message.channel.fetchWebhooks().catch(() => new Collection())).filter(c => c.token && c.url);

    if(!hooks.size) {
        return create();
    } else {
        let hook = hooks.first();

        if(hook) {
            message.client.webhooks.set(message.channelId, { url: hook.url });
            return { url: hook.url };
        } else {
            return create();
        }
    }
};

/**
 * @param {import('discord.js').Client} client 
 * @param {import('discord.js').Message} message 
 */
module.exports = async (client, message) => {
    if (!client.db || message.author.bot) return;
    if (message.channel.type === 'DM') return;

    if (message.content.startsWith(':') && message.content.endsWith(':') && message.content !== '::') {
        let emoji = message.guild.emojis.cache.find(c => c.name.toLowerCase().includes(message.content.replace(/:/g, '').toLowerCase()));

        if (emoji) {
            await message.delete().catch(() => null);

            if (message.channel.id === '1002027980664602705') return; // remove after emoji suggestion channel gone

            let hook = await findOrCreateWebhook(message);
            
            if(hook) {
                return new WebhookClient(hook).send({
                    content: emoji.toString(),
                    username: message.member.displayName,
                    avatarURL: message.member.displayAvatarURL({ format: 'png' }),
                    allowedMentions: { parse: [] }
                }).catch(() => null);
            }
        }
    }

    if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) { message.channel.send(message.author.toString()); }
    
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