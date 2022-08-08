require('colors');
require('dotenv').config();
require('./resources/src').required();
const { Client, Collection, Intents: { FLAGS } } = require('discord.js'),
      { MongoClient } = require('mongodb');


class Puck extends Client {
    constructor() {
        super({
            intents: [
                FLAGS.GUILDS,
                FLAGS.GUILD_MEMBERS,
                FLAGS.GUILD_MESSAGES,
                FLAGS.GUILD_MESSAGE_REACTIONS,
                FLAGS.GUILD_PRESENCES
            ],
            presence: {
                status: 'online',
                activities: [{ name: 'Emilia 🌸', type: 'WATCHING'}]
            }
        });

        this.webhooks = new Collection();
        this.commands = new Collection();

        this.src = require('./resources/src');
        
        this.on('ready', () => this.src.startup([ this, new MongoClient(process.env.MONGODB, { useUnifiedTopology: true }) ]));
        this.on('messageCreate', m => require('./events/message')(this, m));
        this.on('interactionCreate', i => require('./events/interactionCreate')(this, i));
        this.on('guildMemberAdd', m => require('./events/guildMemberAdd')(m));
        this.on('guildMemberRemove', m => require('./events/guildMemberRemove')(m));
        
        this.login(process.env.TOKEN).catch(e => this.error(`[DISCORD:CONNECTION:ERROR]: `.red, e));
    }
}

global.Client = new Puck();