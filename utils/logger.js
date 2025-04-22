function getTimestamp() {
    return new Date().toLocaleTimeString();
}

module.exports = {
    info: (message) => {
        console.log(`[${getTimestamp()}] [INFO] ${message}`);
    },
    success: (message) => {
        console.log(`[${getTimestamp()}] [SUCCESS] ${message}`);
    },
    warn: (message) => {
        console.warn(`[${getTimestamp()}] [WARNING] ${message}`);
    },
    error: (message, error) => {
        console.error(`[${getTimestamp()}] [ERROR] ${message}`);
        if (error) console.error(error);
    }
};