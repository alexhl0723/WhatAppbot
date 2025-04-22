    const { Client, LocalAuth } = require('whatsapp-web.js');
    const eventHandler = require('./handlers/eventHandler');
    require('dotenv').config();
    const commandHandler = require('./handlers/commandHandler');
    const config = require('./config');

    // Initialize the client
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: config.clientId,
        })
    });


    // Register all events
    eventHandler.registerEvents(client);

    // Initialize the command handler
    commandHandler.initialize(client);

    // Initialize WhatsApp client
    client.initialize();