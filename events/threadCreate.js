module.exports = {
    name: 'threadCreate',
    async execute(channel) {
        if (channel.parentId != '1019859452352020540') return;
        let templateCheck = await channel.messages.fetch().then(messages => messages.filter(message => message.author.id === channel.ownerId)).then(msg => { return msg.first().content });
        !templateCheck.includes('I have read the documentation and searched for previously created posts about this') ? channel.send('You have created a post without using the required template.') : null;
        channel.send('Please use `/solved` to delete this post when you\'re done.');
    }
};