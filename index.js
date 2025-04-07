const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const eventHandler = require('./handlers/eventHandler');
const commandHandler = require('./handlers/commandHandler');
const config = require('./config');

// Initialize the client
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: config.clientId,
    })
});

// eventos de registros

eventHandler.registerEvents(client);

// inicializar comandos
commandHandler.initialize(client);

// iniciar cliente
client.initialize();