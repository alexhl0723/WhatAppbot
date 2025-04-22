const config = require('../../config');

module.exports = {
    name: 'broadcast',
    description: 'Envía un mensaje a todos los chats (solo admin)',
    async execute(client, message, args) {
        // Verificar si el remitente es el administrador
        const sender = message.from.split('@')[0];
        if (sender !== config.ownerNumber) {
            return message.reply('⚠️ Solo el administrador puede usar este comando.');
        }

        // Obtener el mensaje a enviar
        const broadcastMessage = args.join(' ');
        if (!broadcastMessage) {
            return message.reply('⚠️ Debes proporcionar un mensaje para enviar.');
        }

        // Solicitar confirmación
        message.reply(`⚠️ ¿Estás seguro de que quieres enviar este mensaje a todos los chats? 
        Responde con *CONFIRMAR* dentro de 30 segundos o escribe *CANCELAR*.`);

        // Escuchar la respuesta del usuario
        const filter = response => 
            ['confirmar', 'cancelar'].includes(response.body.toLowerCase()) && response.from === message.from;
        
        client.once('message', async response => {
            const replyText = response.body.toLowerCase();

            if (replyText === 'cancelar') {
                return message.reply('🚫 Envío cancelado.');
            }

            if (replyText === 'confirmar') {
                // Obtener todos los chats
                const chats = await client.getChats();
                let successCount = 0;

                // Enviar el mensaje a cada chat
                for (const chat of chats) {
                    try {
                        await client.sendMessage(chat.id._serialized, `📢 *ANUNCIO* 📢\n\n${broadcastMessage}`);
                        successCount++;
                    } catch (error) {
                        console.error(`Error al enviar mensaje a ${chat.id._serialized}:`, error);
                    }
                }

                message.reply(`✅ Mensaje enviado a ${successCount} de ${chats.length} chats.`);
            }
        });
    }
};
