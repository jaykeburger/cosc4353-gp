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

  it('should return a 400 status for invalid names', async () => {
    const response = await request(app).get('/history/search').query ({
      name: "@"
    })
    expect(response.status).toBe(400);
  });

  it('should return a 400 status invalid gallon comparison', async () => {
    const response = await request(app).get('/history/search').query ({
      mingallons: 100,
      maxgallons: 50
    })
    expect(response.status).toBe(400);
  });

  it('should return a 400 status for invalid price comparisons', async () => {
    const response = await request(app).get('/history/search').query ({
      minprice: 100,
      maxprice: 50
    })
    expect(response.status).toBe(400);
  });


  it('should return a 200 status for name as John', async () => {
    const response = await request(app).get('/history/search').query ({
      name: 'John'
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results of gallons over 100', async () => {
    const response = await request(app).get('/history/search').query ({
      mingallons: 100
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results of gallons under 100', async () => {
    const response = await request(app).get('/history/search').query ({
      maxgallons: 100
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results of prices over 100', async () => {
    const response = await request(app).get('/history/search').query ({
      minprice: 100
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results of prices under 100', async () => {
    const response = await request(app).get('/history/search').query ({
      maxprice: 100
    })
    expect(response.status).toBe(200);
  });

    it('should return a 200 status for all results when dates are after 2024-03-23', async () => {
    const response = await request(app).get('/history/search').query ({
      startdate: '2024-03-23'
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results when dates are before 2024-03-23', async () => {
    const response = await request(app).get('/history/search').query ({
      enddate: '2024-03-23'
    })
    expect(response.status).toBe(200);
  });

  it('should return a 200 status for all results when dates are before 2024-03-23', async () => {
    const response = await request(app).get('/history/search').query ({
      enddate: '2024-03-23',
      startdate: '2024-04-23'
    })
    expect(response.status).toBe(400);
  });



  afterAll((done) => {
    app.close(done);
  });
});
  
