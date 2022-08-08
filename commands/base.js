module.exports = class Command {
    /**
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").ApplicationCommand} command - These are the ones that get sent to Discord.
    */
    constructor(client, command) {
        this.client = client;
        this.command = command;
    }
    async run() {
        throw new Error(`${this.constructor.name} doesn't have a run function`);
    }
    
    build() {
        if(!this.client.application || !this.command) return;
        return this.client.application.commands.constructor.transformCommand(this.command);
    }
};