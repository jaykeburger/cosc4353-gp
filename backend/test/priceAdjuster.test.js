const request = require('supertest');
const { app, server } = require('../server.js');


describe('Fuel History Info Endpoint', () => {
  it('should return a 200 status for successful connection', async () => {
    const response = await request(app).get('/priceAdjuster')
    expect(response.status).toBe(200);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);  // This correctly uses the server object's close method
    } else {
      done();  // Safely handle cases where the server might not be defined
    }
  }); 
});