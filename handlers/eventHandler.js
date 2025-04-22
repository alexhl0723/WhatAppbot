const qrcode = require('qrcode-terminal');
const config = require('../config');
const logger = require('../utils/logger');

// Register all client events
function registerEvents(client) {
    // QR Code generation event
    client.on('qr', (qr) => {
        logger.info('🔄 Escanea el código QR para iniciar sesión:');
        qrcode.generate(qr, { small: true });
    });

    // Ready event
    client.on('ready', () => {
        logger.success('✅ El bot está en goooooooooooooooooooooo');
        
        // Send welcome message to owner
        let ownerNumber = `${config.ownerNumber}@c.us`;
        client.sendMessage(ownerNumber, config.welcomeMessage);
    });

    // Authentication events
    client.on('authenticated', () => {
        logger.success('🔒 Sesión autenticada correctamente');
    });

    client.on('auth_failure', (msg) => {
        logger.error('❌ Error en la autenticación: ', msg);
    });

    // Disconnection event
    client.on('disconnected', (reason) => {
        logger.warn('⚠️ Bot desconectado: ', reason);
        logger.info('🔄 Reiniciando conexión...');
        client.initialize();
    });
}

module.exports = { registerEvents };