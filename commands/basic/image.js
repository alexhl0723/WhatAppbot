module.exports = {
    name: 'i',
    description: 'Convierte un sticker en imagen (respondiendo con #i)',
    async execute(client, message, args) {
        if (!message.hasQuotedMsg) {
            return message.reply('⚠️ Debes responder a un sticker con *#i* para convertirla en sticker.');
        }

    const quoted = await message.getQuotedMessage(); //obtiene el mensaje

    if (!quoted.hasMedia) {
        return message.reply('⚠️ El mensaje citado no contiene una imagen.');
    }

    const media = await quoted.downloadMedia(); //descarga el el archivo

    if (!media || !media.mimetype.startsWith('image/')) {
        return message.reply('⚠️ El mensaje citado no es una imagen válida.');
    }

    // Obtener el ID del chat correcto (funciona tanto en grupos como en chats personales)
    const chatId = message._data.id.remote;
    
    // Enviar como imagen
    
        await client.sendMessage(chatId, media, {
            sendMediaAsSticker: false,
            caption: 'botMewin'
        });
        console.log('✅ image enviado a:', chatId);
    }
};
