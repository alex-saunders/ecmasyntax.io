import path     from 'path';
import http     from 'http';
import express  from 'express';
import enforce  from 'express-sslify';

import apiRouter  from './api';
import routes     from './routes';

const port = (process.env.PORT || 5000);

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use('/api', apiRouter)

app.use('/', routes);

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
