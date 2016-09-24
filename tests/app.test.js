import test from 'tape';
import request from 'supertest';
import createApp from '../app';

// {"ip":"::1","os":"Mac OS","lang":"en-US,en;q=0.8"}
//    const os = uaParser( req.header('User-Agent')).os.name;
//    const lang = req.header('Accept-Language');

test('blah', (t) => {
  const app = createApp();
  request(app).get('/').expect(200).end((err, res) => {
    console.log(res.body);
    t.end(err);
    app.close();
  });
});
