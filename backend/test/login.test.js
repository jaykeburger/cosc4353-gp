const request = require('supertest');
const { app, server } = require('../server.js'); 

describe('Login Endpoint', () => {
  it('should return a 400 status if the username is not provided', async () => {
    const response = await request(app).post('/login').send({
      password: '12345!',
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username and password are required');
  });

  it('should return a 400 status if the password is not provided', async () => {
    const response = await request(app).post('/login').send({
      username: 'apple',
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username and password are required');
  });

  it('should return a 401 status for incorrect username', async () => {
    const response = await request(app).post('/login').send({
      username: 'nonexistentuser',
      password: '12345!',
    });
    expect(response.status).toBe(401);
    expect(response.text).toContain('Invalid username or password');
  });

  it('should return a 401 status for incorrect password', async () => {
    const response = await request(app).post('/login').send({
      username: 'apple',
      password: 'wrongpassword',
    });
    expect(response.status).toBe(401);
    expect(response.text).toContain('Invalid username or password');
  });

  it('should return a 200 status for successful login', async () => {
    const loginData = { username: 'apple', password: '12345!' };
    console.log(`Testing successful login with data:`, loginData);
    
    const response = await request(app).post('/login').send(loginData);
  
    console.log(`Received status: ${response.status}, body: ${response.text}`);
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('User logged in successfully');
  });
  

  afterAll((done) => {
    if (server) {
      server.close(done);  // This correctly uses the server object's close method
    } else {
      done();  // Safely handle cases where the server might not be defined
    }
  });  
});
