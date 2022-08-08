const { MessageEmbed } = require('discord.js');

let client;
module.exports = {
    required() {
        for (const name of [ 'TOKEN', 'MONGODB', 'OWNER', 'GUILD' ]) {
            if(!process.env[name]) {
                console.error(`[START:ENV:ERROR]`.red, `Missing (${name}) in the .env file!`);
                return process.exit(1);
            }
        }
    },
    startup(input) {
        client = input[0];        
        require('../handler/loader')(client);
        require('./src').status();
        require('./src').database(input[1]);
        
        client.guilds.fetch(process.env.GUILD).then(guild => {
            guild.channels.fetch('1006080822215966741').then(channel => {
                channel.setName(`User Count: ${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`.red));
            }).catch(e => console.error(`[ERROR]: ${e}`.red));
        })
        
    },
    status() {
        setInterval(() => {
            let key = [
                { type: 'WATCHING', data: 'people not read FAQ' },
                { type: 'WATCHING', data: 'devs push back releases' },
                { type: 'PLAYING', data: 'PlayCover' },
                { type: 'PLAYING', data: 'with Emilia 🌸' },
                { type: 'PLAYING', data: 'with depression' },
            ];
            let rand = key[Math.floor(Math.random() * key.length)];

            client.user.setPresence({ status: 'online', activities: [ { name: rand.data, type: rand.type } ] });
        }, 5 * 60000);
        setTimeout(() => client.user.setPresence({ status: 'online', activities: [ { name: '/help', type: 'WATCHING' } ] }), 60000);
    },
    async database(database) {
        database.connect(async error => {
            if (error) { 
                client.src.error(error); 
                client.db = false; 
                return database.close(); 
            }

            client.database = database.db('Puck');
            client.database.listCollections().toArray(async (error, collections) => {
                if (error) return client.src.error(error);

                let exists = [], required = []; // Add collections here
                collections.forEach(collection => exists.push(collection.name));

                for (let collection of required) { 
                    if (!exists.includes(collection)) { 
                        await client.database.createCollection(collection, (error) => { 
                            if (error) client.src.error(error); 
                        }); 
                    } 
                }
            });

            client.db = true;
            for (const name of []) client.database[name] = client.database.collection(name); // Add collections here as well
            
            console.log(`[PROGRM]: Database Connection Successful!`.green);
        });
    },
    error(input) { console.log(`${`[ERROR!]: ${input}`.red}`); },
    embed() {
        return new MessageEmbed()
            .setFooter({ text: `Provided by: ${client.user.tag}`, iconURL: client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})
            .setColor('#47791')
            .setTimestamp()
    },
    time(date, format = 'f') {
        return `<t:${Math.floor(new Date(date).getTime() / 1000)}${format ? `:${format}` : ''}>`
    }
}