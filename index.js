const fs = require('fs');
const path = require('path');

class Logger {
    constructor(options = {}) {
        this.logDirectory = options.logDirectory || 'logs';
        this.fileName = options.fileName || 'log.txt';
        
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }

        this.filePath = path.join(this.logDirectory, this.fileName);
    }

    log(user, message, httpStatus) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [User: ${user}] [HTTP Status: ${httpStatus}] ${message}\n`;
        fs.appendFileSync(this.filePath, logMessage);
    }

    readLogs() {
        if (!fs.existsSync(this.filePath)) {
            return 'Log file does not exist.';
        }
        return fs.readFileSync(this.filePath, 'utf8');
    }

    getLogsAsJson() {
        const logs = this.readLogs().split('\n').filter(Boolean);
        return logs.map(log => {
            const [timestamp, userPart, statusPart, ...messageParts] = log.split('] ');
            return {
                timestamp: timestamp.replace('[', ''),
                user: userPart.replace('[User: ', '').replace(']', ''),
                httpStatus: statusPart.replace('[HTTP Status: ', '').replace(']', ''),
                message: messageParts.join('] ')
            };
        });
    }

    clearLogs() {
        fs.writeFileSync(this.filePath, '');
        console.log('Log file cleared.');
    }
}

module.exports = Logger;
