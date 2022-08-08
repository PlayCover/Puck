const fs = require('fs');

module.exports = async (client) => {
    let count = 0, approved = 0, broken = [];

    console.log(`[SYSTEM]: Loading Resources!`.yellow);

    for (let main of ['./resources/', './handler/', './']) { 
        for (let file of require('fs').readdirSync(main).filter(file => file.split('.').pop() === 'js')) { 
            require('fs').readFile(`${main}${file}`, 'utf8', function (error) { if (error) { client.src.error(error); } }); 
        } 
    }

    console.log(`[SYSTEM]: Successfully Loaded Resources!`.green);
    console.log(`[SYSTEM]: Loading Commands!`.yellow);

    fs.readdirSync(`./commands/`).forEach(async dir => {
        if(dir ==='base.js') return;

        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.split(`.`).pop() === `js`);

        for (let file of commands) {
            try {
                let pull = require(`../commands/${dir}/${file}`);
                if(pull?.constructor?.name !== 'Function') continue;    
                pull = new pull(client);

                fs.readFile(`./commands/${dir}/${file}`, `utf8`, function (error) { 
                    if (error) client.src.error(error);
                });

                if (pull.command?.name) {
                    pull.group = dir;
                    client.commands.set(pull.command.name, pull);
                    count++; approved++;
                } else { 
                    count++; 
                    broken.push(file); 
                    continue; 
                }
            } catch (err) {
                console.error(err);
                continue;
            }
        }
    });

    console.log(`${`[SYSTEM]: Successfully Loaded ${approved}/${count} Commands!`.green}${broken.length > 0 ? `\n[ERROR!]: Failed To Load: ${broken.join(', ')}`.red : ``}`);
    console.log(`[SYSTEM]: Deploying Commands!`.yellow);

    let data = [];
    for (const command of client.commands.values()) {
        if(!command.build) continue;
        data.push(command.build());
    }

    let guild = await client.guilds.fetch(process.env.GUILD);
    let res = await guild.commands.set(data).catch(e => e);

    if(res instanceof Error) return client.src.error(res);
    console.log(`[SYSTEM]: Successfully Deployed ${approved}/${count} Commands!`.green);

    return console.log(`\n${`[PROGRM]: ${client.user.tag} Connection Successful!`.green}`);
}