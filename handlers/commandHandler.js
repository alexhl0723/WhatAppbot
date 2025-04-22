const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');

// Store all commands
const commands = new Map();

// Load all commands from the commands directory
function loadCommands() {
    const commandFolders = fs.readdirSync('./commands');
    
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            commands.set(command.name, command);
            logger.info(`Comando cargado: ${command.name} (${folder})`);
        }
    }
    
    logger.success(`Total de comandos cargados: ${commands.size}`);
}

// Handle incoming messages
function handleMessage(client, message) {
    const prefix = config.prefix;
    
    // Check if message starts with prefix
    if (!message.body.startsWith(prefix)) return;
    
    // Extract command name and arguments
    const args = message.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // verifica si el comando existezzz
    if (!commands.has(commandName)) return;
    
    // Get command and execute it
    const command = commands.get(commandName);
    
    try {
        command.execute(client, message, args);
        logger.info(`Comando ejecutado: ${commandName}`);
    } catch (error) {
        logger.error(`Error ejecutando comando ${commandName}:`, error);
        message.reply('Hubo un error al ejecutar el comando.');
    }
}

// Initialize command handler
function initialize(client) {
    // Load all commands
    loadCommands();
    
    // Register message listener
    client.on('message_create', (message) => {
        handleMessage(client, message);
    });
    
    logger.success('Manejador de comandos inicializado');
}

module.exports = { initialize };