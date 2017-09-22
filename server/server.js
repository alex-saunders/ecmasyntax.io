const path = require('path');
const express = require('express');

const apiRouter = require('./api');
const routes = require('./routes');

const port = process.env.port || 5000;

const app = express();

app.use('/api', apiRouter)

app.use('/', routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
