const sharp = require('sharp');
const { MessageMedia } = require('whatsapp-web.js'); // <-- IMPORTANTE


module.exports = {
    name: 'i',
    description: 'Convierte un sticker en imagen (respondiendo con #i)',
    async execute(client, message, args) {
        if (!message.hasQuotedMsg) {
            return message.reply('⚠️ Debes responder a un sticker con *#i* para convertirlo en imagen.');
        }

        const quoted = await message.getQuotedMessage();

        if (!quoted.hasMedia) {
            return message.reply('⚠️ El mensaje citado no contiene un sticker.');
        }

        const media = await quoted.downloadMedia();
        if (!media || !media.mimetype.startsWith('image/')) {
            return message.reply('⚠️ El mensaje citado no es una imagen válida.');
        }

        try {
            const buffer = Buffer.from(media.data, 'base64');

            // Convertir a PNG manteniendo transparencia
            const pngBuffer = await sharp(buffer).png().toBuffer();

            // Crear objeto MessageMedia correctamente
            const base64Image = pngBuffer.toString('base64');
            const imageMedia = new MessageMedia('image/png', base64Image, 'imagen_convertida.png');

            await client.sendMessage(message.from, imageMedia, {
                caption: 'botMewin'
            });

            console.log('✅ Imagen transparente enviada a:', message.from);
        } catch (err) {
            console.error('❌ Error al convertir y enviar imagen:', err);
            return message.reply('❌ Hubo un error al convertir el sticker.');
        }
    }
};
