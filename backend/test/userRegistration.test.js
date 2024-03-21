const request = require('supertest');
const app = require('../server.js');


describe('Registration Info Endpoint', () => {
  it('hould return a 200 status for empty username', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'jappleseed' 
    });
    expect(response.status).toBe(200);
    expect(response.text).toContain('This username is already in use');
  });


  afterAll((done) => {
    app.close(done);
  });
});
  
