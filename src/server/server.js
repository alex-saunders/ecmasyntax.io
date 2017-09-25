import path     from 'path';
import express  from 'express';

import apiRouter  from './api';
import routes     from './routes';

const port = (process.env.PORT || 5000);

const app = express();

app.use (function (req, res, next) {
  if (!req.secure) { res.url = 'https://' + req.url; }
  next();
});

app.use('/api', apiRouter)

app.use('/', routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
