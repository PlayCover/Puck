module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || message.channel.type === 'DM') return;

        if (message.content.includes(`<@${message.client.user.id}>`) || message.content.includes(`<@!${message.client.user.id}>`)) message.channel.send(message.author.toString());
        if (message.content === '(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B') message.reply('\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)');
        if (message.channel.type === 11 && message.channel.parentId === '1019859452352020540') {
            if (message.client.messageList.has(message.channel.id)) return;
            else message.client.messageList.set(message.channel.id, true);

            if (message.channel.messages.cache.first().content.includes(`I have read the documentation and searched for previously created posts about this`)) return;

            await message.reply(`You have created a post without using the required template.`);
        }
    }
};
