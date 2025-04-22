const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Muestra todos los comandos disponibles',
    execute(client, quoted, args) {
        let helpText = '🤖 *COMANDOS DISPONIBLES* 🤖\n\n';
        
        // Read all command folders
        const commandFolders = fs.readdirSync('./commands');
        
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            
            helpText += `*${folder.toUpperCase()}*\n`;
            
            for (const file of commandFiles) {
                const command = require(`../${folder}/${file}`);
                helpText += `${config.prefix}${command.name} - ${command.description}\n`;
            }
            
            helpText += '\n';
        }
        
        quoted.reply(helpText);
    }
};