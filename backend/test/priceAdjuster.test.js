const request = require('supertest');
const app = require('../server.js');


describe('Price Adjuster Endpoint', () => {
  it('should return a 200 status for successful connection', async () => {
    const response = await request(app).get('/priceAdjuster')
    expect(response.status).toBe(200);
  });

  it('should handle callback(err)', (done) => {
    getHistoryAndState('nonexistentUsername', (err, results) => {
      expect(err).toBeTruthy();
      done();
    });
  });

  it('should handle callback(null, null)', (done) => {
    getHistoryAndState('', (err, results) => {
      expect(results).toBeNull();
      done();
    });
  });

    afterAll((done) => {
    app.close(done);
  });
});
  