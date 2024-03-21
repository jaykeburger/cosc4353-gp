const request = require('supertest');
const app = require('../server.js');


describe('Registration Info Endpoint', () => {
  it('should return a 400 status for duplicate usernames', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'jappleseed',
      password: '1234!',
      password_confirm: '1234!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('This username is already in use');
  });

  it('should return a 400 status for passwords not matching', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'jappleseed',
      password: '12345!',
      password_confirm: '1234!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Passwords do not match!');
  });
   it('should return a 400 status for short usernames', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'app',
      password: '1234!',
      password_confirm: '1234!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username must be atleast 5 characters');
  });

   it('should return a 400 status for too long usernames', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'apprfwefwfw34324233ffw',
      password: '12345!',
      password_confirm: '12345!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username must be less than 12 characters');
  });
  it('should return a 400 status for short passwords', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'apple',
      password: '123!',
      password_confirm: '123!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Password must be atleast 5 characters');
  });
   it('should return a 400 status for too long passwords', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'apple',
      password: '123451231231!',
      password_confirm: '123451231231!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Password must be less than 12 characters');
  });
it('should return a 400 status for usernames with a space', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'app le',
      password: '12345!',
      password_confirm: '12345!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username cannot contain spaces');
  });

   it('should return a 400 status for usernames with a special character', async () => {
    const response = await request(app).post('/registration').send({ 
      username: '@pple',
      password: '12345!',
      password_confirm: '12345!'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Username cannot contain special characters');
  });
  it('should return a 400 status for passwords without a special character', async () => {
    const response = await request(app).post('/registration').send({ 
      username: 'apple',
      password: '12345',
      password_confirm: '12345'
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Password must contain special characters');
  });

  afterAll((done) => {
    app.close(done);
  });
});
  
