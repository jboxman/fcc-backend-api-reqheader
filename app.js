import express from 'express';
import uaParser from 'ua-parser-js';

// For testing:
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
export default function() {
  const app = express();

  const port = process.env.PORT || 3100;

  // Just handle them all.
  app.use(function(req, res, next) {
    const os = uaParser( req.header('User-Agent')).os.name;
    const lang = req.header('Accept-Language');
    const ip = req.ip;
    res.status(200).send({
      ip, os, lang
    });
  });

  const server = app.listen(port, () => console.log(`Listening on ${port}`));
  return server;
};
