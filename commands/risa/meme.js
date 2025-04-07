module.exports = {
    name: 'meme',
    description: 'Envía un meme aleatorio',
    async execute(client, message, args) {
        // Array de URLs de memes (puedes reemplazar con una API real)
        const memes = [
            'https://i.imgur.com/1.jpg',
            'https://i.imgur.com/2.jpg',
            'https://i.imgur.com/3.jpg',
            'https://i.imgur.com/4.jpg',
            'https://i.imgur.com/5.jpg'
        ];
        
        // Seleccionar un meme aleatorio
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        
        message.reply('Enviando meme... 🤣');
        
        // Simular el envío de una imagen
        // Nota: Para enviar realmente una imagen, necesitarías usar MessageMedia
        // const { MessageMedia } = require('whatsapp-web.js');
        // const media = await MessageMedia.fromUrl(randomMeme);
        // await client.sendMessage(message.from, media, { caption: '¡Disfruta el meme! 😂' });
        
        // Por ahora solo enviamos el enlace
        message.reply(`¡Aquí tienes tu meme! 😂\n${randomMeme}`);
    }
};