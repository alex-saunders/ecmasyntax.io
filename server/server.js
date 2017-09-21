const path = require('path');
const express = require('express');

const apiRouter = require('./api');

const port = process.env.port || 5000;

const app = express();

app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, '../', 'public')));

app.use((req, res) => {
  console.log('here');
  res.sendFile('index.html', {
    root: path.join(__dirname, '../', 'public')
  });
})


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
