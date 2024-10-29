
# express-logger-helper

`express-logger-helper` is a simple and useful logging and reporting tool for Node.js and Express.js-based applications. It allows you to log user activities or system events and export these logs as text or JSON reports.

## Features

- **Logging:** Records log messages with timestamps.
- **Read Logs:** Reads recorded logs in plain text format.
- **JSON Reporting:** Exports logs as JSON format.
- **Clear Logs:** Clears the log file to remove old records.
- **Customizable File and Directory:** Specify the file name and directory where logs are stored.

## Installation

```bash
npm install express-logger-helper
```

## Usage

### 1. Import and Initialize

```javascript
const Logger = require('express-logger-helper');

// Initialize the logger
const logger = new Logger({
    logDirectory: 'my-logs',
    fileName: 'app-log.txt'
});
```

### 2. Log Events

```javascript
// Log a message
logger.log('User logged in successfully.');
logger.log('Payment transaction completed.');
```

### 3. Read Logs

```javascript
// Read logs as plain text
console.log(logger.readLogs());
```

### 4. Get Logs as JSON

```javascript
// Get logs in JSON format
console.log(logger.getLogsAsJson());
```

### 5. Clear Logs

```javascript
// Clear all logs
logger.clearLogs();
```

## Configuration Options

- `logDirectory` (default: 'logs'): Directory where log files are stored.
- `fileName` (default: 'log.txt'): Name of the log file.

## Example

```javascript
const Logger = require('express-logger-helper');
const express = require('express');

const app = express();
const logger = new Logger();

app.use((req, res, next) => {
    logger.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## License

MIT
