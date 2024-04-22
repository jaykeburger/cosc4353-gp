const request = require('supertest');
const app = require('../server.js');


describe('Profile Management Endpoint', () => {
  it('should return a 400 status for empty name', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      name: '' 
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Name must contain letters and cannot be empty');
  });

  it('should return a 400 status for character over 50 characters', async () => {
    const response = await request(app).post('/profileInfo').send({ 
        "name" : "John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe",
        "add1" : "123 Appleseed Ln",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Name must be less than 50 characters');  
  });

  it('should return a 400 status for character an empty Address 1', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Address 1 must contain letters and cannot be empty');  
  });

  it('should return a 400 status for character limit over 100 in Address 1', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Address 1 must be less than 100 characters');  
  });

  it('should return a 400 status for character limit over 100 in Address 2', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Address 2 must be less than 100 characters');  
  });

  it('should return a 400 status for an empty city field', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('City must contain cannot be empty');  
  });

  it('should return a 400 status for a city entry with numbers', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston1",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('City must only contain letters');  
  });

  it('should return a 400 status for city with 100+ characters', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "HoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHouston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('City must be less than 100 characters');  
  });

  it('should return a 400 status for empty State', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('State cannot be empty');  
  });

  it('should return a 400 status for empty zipcode', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : ""
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Zipcode cannot be empty');  
  });

  it('should return a 400 status for zipcode greater than 9', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345678910"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Zipcode must be less than 9 characters');  
  });

  it('should return a 400 status for zipcode less than 5', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "1234"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Zipcode must be at least 5 characters');  
  });

  it('should return a 200 if all fields are inputted correctly', async () => {
    const response = await request(app).post('/profileInfo').send({ 
      "name" : "John Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(200);
        expect(response.text).toContain('User profile information completed succesfully.');  
  });
  afterAll((done) => {
    app.close(done);
  });
});
  
