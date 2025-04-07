const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'toimage',
    description: 'Convierte una imagen "ver una vez" en una imagen normal y la guarda en el chat.',
    async execute(client, message, args) {
        if (!message.hasQuotedMsg) {
            return message.reply('⚠️ Debes responder a una imagen "ver una vez" con #toimage.');
        }

        try {
            const quotedMsg = await message.getQuotedMessage();

            if (!quotedMsg) {
                return message.reply('⚠️ No se pudo obtener el mensaje citado.');
            }

            // Imprimir en consola para depurar
            console.log('Mensaje citado:', quotedMsg);

            if (!quotedMsg.hasMedia || quotedMsg.type !== 'image' || quotedMsg._data?.subtype !== 'view_once') {
                return message.reply('⚠️ El mensaje citado no es una imagen "ver una vez".');
            }

            const media = await quotedMsg.downloadMedia();
            await client.sendMessage(message.from, media);

            message.reply('✅ Imagen guardada en el chat.');
            console.log(`📸 Imagen "ver una vez" convertida en normal en ${message.from}`);
        } catch (error) {
            console.error('❌ Error al guardar y reenviar la imagen:', error);
            message.reply('❌ Hubo un error al procesar la imagen.');
        }
    }
};
