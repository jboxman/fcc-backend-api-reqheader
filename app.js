import express from 'express';
import uaParser from 'ua-parser-js';

// For testing:
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
export default function() {
  const app = express();

  const port = process.env.PORT || 3100;

  app.use(express.static(`${__dirname}/public`));

  app.get('/fingerprint', function(req, res) {
    const os = uaParser(req.header('User-Agent')).os.name || null;
    const lang = req.header('Accept-Language') || null;
    const ip = req.ip;
    res.status(200).send({
      ip, os, lang
    });
  });

  app.use(function(req, res, next) {
    res.status(404).send('Not Found');
  });

  const server = app.listen(port, () => console.log(`Listening on ${port}`));
  return server;
};
