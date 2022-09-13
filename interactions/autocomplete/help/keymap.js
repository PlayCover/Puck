module.exports = {
	name: 'keymap',
	async execute(interaction) {
		if (interaction.isAutocomplete()) {
            let focusedOption = interaction.options.getFocused();
            let choices = require('../../../resources/keymaps.json').map(keymap => keymap.name);
            let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.toLowerCase()));
            return interaction.respond(filtered.map(c => ({ name: c, value: c })));
        }
	},
};