module.exports = {
    name: 'docs',
    async execute(interaction) {
        if (interaction.isAutocomplete()) {
            let focusedOption = interaction.options.getFocused();
            let choices = require('../../../resources/pages.json').map(page => page.name);
            let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.toLowerCase()));
            return interaction.respond(filtered.map(c => ({ name: c, value: c })));
        }
    },
};