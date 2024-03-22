const request = require('supertest');
const app = require('../server.js');


describe('Quote Creation Endpoint', () => {
  it('should return a 400 status for empty amount of gallons requested', async () => {
    const response = await request(app).post('/quoteCreation').send({ 
        gallons_requested: '' 
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Gallons Requested must contain numbers and cannot be empty');
  });

  it('should return a 400 status for gallons being over 100000000', async () => {
    const response = await request(app).post('/quoteCreation').send({ 
        "gallons_requested" : "100000000",
        "delivery_address" : "4632 Lakeside Dr",
        "delivery_date" : "09/15/2023",
        "price" : "2.42",
        "total" : "5434",
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Gallons Requested must be less than 100000000');  
  });

  it('should return a 400 status for delivery address being over 100 characters', async () => {
    const response = await request(app).post('/quoteCreation').send({ 
      "gallons_requested" : "5453",
      "delivery_address" : "4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr4632 Lakeside Dr",
      "delivery_date" : "09/15/2023",
      "price" : "2.42",
      "total" : "5434",
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Delivery address must be less than 100 characters');  
  });
  it('should return a 400 status for not being in date format', async () => {
    const response = await request(app).post('/quoteCreation').send({ 
      "gallons_requested" : "5453",
      "delivery_address" : "4632 Lakeside Dr",
      "delivery_date" : "hgjdfhgfhdg",
      "price" : "2.42",
      "total" : "5434",
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Delivery Date must not be empty and must be a valid date');  
  });
  it('should return a 400 status date format being empty', async () => {
    const response = await request(app).post('/quoteCreation').send({ 
      "gallons_requested" : "5453",
      "delivery_address" : "4632 Lakeside Dr",
      "delivery_date" : "",
      "price" : "2.42",
      "total" : "5434",
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Delivery Date must not be empty and must be a valid date');  
  });

  afterAll((done) => {
    app.close(done);
  });
});
  
