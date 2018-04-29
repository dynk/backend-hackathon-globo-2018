
const express = require('express');
const app = express();
const logger =  require('./utils/logger');
const bodyParser = require('body-parser');

const PORT = 3020;

// Logging unhandled promises rejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

app.use(require('cors')());
app.use(bodyParser.json());

app.use(`/`, require('./routes'));

app.listen(PORT, () => {

    console.log("jere");
  logger.debug(`Listening on port ${PORT}`);
});

