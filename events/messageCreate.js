module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || message.channel.type === 'DM') return;

        if (message.content.includes(`<@${message.client.user.id}>`) || message.content.includes(`<@!${message.client.user.id}>`)) message.channel.send(message.author.toString());
        if (message.content === '(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B') message.reply('\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)');
    }
};
