import test from 'tape';
import request from 'supertest';
import createApp from '../app';

// {"ip":"::1","os":"Mac OS","lang":"en-US,en;q=0.8"}
//    const os = uaParser( req.header('User-Agent')).os.name;
//    const lang = req.header('Accept-Language');

test('app.js', (t) => {

  t.test('Windows en-US', (t) => {
    const agent = ['User-Agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'];
    const lang = ['Accept-Language', 'en-US']
    const app = createApp();

    request(app)
    .get('/fingerprint')
    // Test conditions
    .set(...agent)
    .set(...lang)
    .expect(200)
    // Run
    .end((err, res) => {
      t.equal(res.body.os, 'Windows')
      t.equal(res.body.lang, 'en-US')
      app.close();
      t.end(err);
    });
  });

  t.test('missing information', (t) => {
    const app = createApp();

    request(app)
    .get('/fingerprint')
    .expect(200)
    .end((err, res) => {
      t.equal(res.body.os, null)
      t.equal(res.body.lang, null)
      app.close();
      t.end(err);
    });
  });

});
