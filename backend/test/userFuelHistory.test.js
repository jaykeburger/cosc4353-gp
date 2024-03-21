const request = require('supertest');
const app = require('../server.js');


describe('Fuel History Info Endpoint', () => {
  it('should return a 200 status for successful connection', async () => {
    const response = await request(app).get('/history')
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for successful search', async () => {
    const response = await request(app).get('/history/search')
    expect(response.status).toBe(200);
  });

  // it('should return a 400 status for invalid names', async () => {
  //   const response = await request(app).get('/history/search').send ({
  //     enddate: "",
  //     maxgallons: "",
  //     maxprice: "",
  //     mingallons: "",
  //     minprice: "",
  //     name: "@",
  //     startdate: ""
  //   })
  //   expect(response.status).toBe(400);

  // });

  afterAll((done) => {
    app.close(done);
  });
});
  
