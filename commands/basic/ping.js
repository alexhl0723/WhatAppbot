module.exports = {
    name: 'ping',
    description: 'Revisa si el bot está respondiendo',

    execute(client, message, args) {
        const chatId = message._data.id.remote;
        client.sendMessage(chatId, 'Depositame causa 💸');
    }
};
