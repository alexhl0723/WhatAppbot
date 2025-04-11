module.exports = {
    name: 's',
    description: 'Convierte una imagen en sticker (respondiendo con #s)',
    async execute(client, message, args) {
        if (!message.hasQuotedMsg) {
            return message.reply('⚠️ Debes responder a una imagen con *#s* para convertirla en sticker.');
        }

        const quoted = await message.getQuotedMessage();

        if (!quoted.hasMedia) {
            return message.reply('⚠️ El mensaje citado no contiene una imagen.');
        }

        const media = await quoted.downloadMedia();

        if (!media || !media.mimetype.startsWith('image/')) {
            return message.reply('⚠️ El mensaje citado no es una imagen válida.');
        }

        // Obtener el ID del chat correcto (funciona tanto en grupos como en chats personales)
        const chatId = message._data.id.remote;
        
        // Enviar el sticker al chat actual
        await client.sendMessage(chatId, media, {
            sendMediaAsSticker: true,
            stickerName: 'Hecho por Alexzzzzz',
            stickerAuthor: 'zzzitta bro'
        });

        console.log('✅ Sticker enviado a:', chatId);
    }
};