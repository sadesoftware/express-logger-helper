const fs = require('fs');
const path = require('path');

class Logger {
    constructor(options = {}) {
        this.logDirectory = options.logDirectory || 'logs';
        this.fileName = options.fileName || 'log.txt';

        // Validate and sanitize log directory and file name
        if (!/^[a-zA-Z0-9-_]+$/.test(this.logDirectory) || !/^[a-zA-Z0-9-_]+\.txt$/.test(this.fileName)) {
            throw new Error('Invalid directory or file name');
        }

        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory, { recursive: true, mode: 0o755 });
        }

        this.filePath = path.join(this.logDirectory, this.fileName);
        
        // Ensure log file exists with appropriate permissions
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '', { mode: 0o644 });
        }
    }

    log(user, message, httpStatus) {
        // Input validation
        if (typeof user !== 'string' || typeof message !== 'string' || typeof httpStatus !== 'number') {
            throw new Error('Invalid input types');
        }

        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [User: ${user}] [HTTP Status: ${httpStatus}] ${message}\n`;
        
        fs.appendFileSync(this.filePath, logMessage, { mode: 0o644 });
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
        fs.writeFileSync(this.filePath, '', { mode: 0o644 });
        console.log('Log file cleared.');
    }
}

module.exports = Logger;