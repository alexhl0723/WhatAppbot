const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: 'clima',
    description: 'Obtiene el clima actual de una ciudad',
    async execute(client, message, args) {
        const ciudad = args.join(" ");
        if (!ciudad) {
            return message.reply('❗ Escribe una ciudad. Ejemplo: *#clima Lima*');
        }

        const apiKey = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&lang=es&units=metric`;

        try {
            const res = await axios.get(url);
            const data = res.data;

            const respuesta = `🌤️ *Clima en ${data.name}, ${data.sys.country}:*\n\n` +
                `🌡️ Temperatura: *${data.main.temp}°C*\n` +
                `💧 Humedad: *${data.main.humidity}%*\n` +
                `🌬️ Viento: *${data.wind.speed} m/s*\n` +
                `☁️ Condición: *${data.weather[0].description}*`;

            await message.reply(respuesta);
        } catch (error) {
            console.error("❌ Error al obtener el clima:", error.message);
            await message.reply("❌ No se pudo obtener el clima. Verifica el nombre de la ciudad o intenta más tarde.");
        }
    }
};
