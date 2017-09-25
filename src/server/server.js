import path     from 'path';
import express  from 'express';
import forceSSL from 'express-force-ssl';

import apiRouter  from './api';
import routes     from './routes';

const port = (process.env.PORT || 5000);

const app = express();

app.use(forceSSL);

app.use('/api', apiRouter)

app.use('/', routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
