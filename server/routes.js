const express       = require('express');
const fs            = require('fs');
const path          = require('path');
const crypto        = require('crypto');
const staticModule  = require('static-module');

const manifest = require('../public/static/js/manifest.json');

const router = express.Router();

router.get('/sw.js', async (req, res) => {
  const input = fs.createReadStream(path.resolve(__dirname, '../', 'sw.js'));

  let precacheassetsToCache = Object.values(manifest);

  const precacheHash  = crypto.createHash('md5');

  for (let asset of precacheassetsToCache) {
    precacheHash.update(asset);
  }    

  const precacheDigest  = precacheHash.digest('hex');

  res.set('Content-Type', 'application/javascript');  
  input.pipe(
    staticModule({
      'static-precache-version': () => JSON.stringify(precacheDigest),
      'static-precache': () => JSON.stringify(precacheassetsToCache),
    })
  ).pipe(res);
});

router.use(express.static(path.join(__dirname, '../', 'public')));

router.use((req, res) => {
  res.send(`
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="preload" as="style" crossorigin onload="this.rel='stylesheet'">
        <link rel="shortcut icon" href="/static/icons/favicon.ico">
        <link rel="manifest" href="/manifest.json">
      </head>
      <body>
        <div id="root">
          
        </div>
        <script>
          if (navigator.serviceWorker) {
            navigator.serviceWorker.register('/sw.js');
          }
        </script>
        <script src="${manifest['vendor.js']}"></script>
        <script src="${manifest['app.js']}"></script>
      </body>
    </html>
  `)
});

module.exports = router;