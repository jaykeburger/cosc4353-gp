const request = require('supertest');
const { app, server } = require('../server.js');

jest.mock('mysql', () => ({
  createConnection: () => ({
      connect: jest.fn(),
      query: jest.fn((sql, params, callback) => {
          if (sql.includes('SELECT')) {
              // Simulate fetching user information
              if (params.includes('testuser')) {
                  callback(null, [{ firstname: 'Test', lastname: 'User', email: 'test@example.com', add1: '123 Test St', add2: '', city: 'Testville', state: 'TS', zipcode: '12345' }]);
              } else {
                  callback(new Error('User not found'), null);
              }
          } else if (sql.includes('UPDATE')) {
              // Simulate updating user information
              callback(null, { affectedRows: 1 });
          }
      }),
      end: jest.fn()
  })
}));

const { getInfo, updateInfo } = require('../controllers/profileManagementController');

describe('Profile Management Endpoint', () => {
  test('getInfo returns user data for existing user', done => {
    getInfo('testuser', (err, data) => {
        expect(err).toBeNull();
        expect(data).toEqual(expect.objectContaining({
            firstname: 'Test',
            lastname: 'User',
            email: 'test@example.com'
        }));
        done();
    });
});

test('getInfo handles errors for non-existing user', done => {
    getInfo('unknown', (err, data) => {
        expect(err).toBeTruthy();
        expect(data).toBeNull();
        done();
    });
});

test('updateInfo successfully updates user data', done => {
    const userData = { firstname: 'Updated', lastname: 'User', email: 'updated@example.com', add1: '123 Updated St', add2: '', city: 'Updateville', state: 'US', zipcode: '12345' };
    updateInfo('testuser', userData, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(expect.objectContaining({
            message: 'Profile updated successfully',
            affectedRows: 1
        }));
        done();
    });
});

  it('should return a 400 status for empty name', async () => {
    const response = await request(app).post('/profile-management').send({ 
      firstname: '' 
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain('First Name must contain letters and cannot be empty');
  });

  it('should return a 400 status for character over 50 characters', async () => {
    const response = await request(app).post('/profile-management').send({ 
        "firstname" : "John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe",
        "lastname" :"Doe",
        "add1" : "123 Appleseed Ln",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('First Name must be less than 50 characters');  
  });

  it('should return a 400 status for character over 50 characters', async () => {
    const response = await request(app).post('/profile-management').send({ 
        "firstname" : "John",
        "lastname" :"John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe",
        "add1" : "123 Appleseed Ln",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       }); 
        expect(response.status).toBe(400);
        expect(response.text).toContain('Last Name must be less than 50 characters');  
  });

  it('should return a 400 status for character an empty Address 1', async () => {
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
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
    const response = await request(app).post('/profile-management').send({ 
      "firstname" : "John",
      "lastname" : "Doe",
      "add1" : "123 Appleseed",
      "add2" : "",
      "city" : "Houston",
      "state" : "TX",
      "zipcode" : "12345"
       }); 
        expect(response.status).toBe(200);
        expect(response.text).toContain('Profile updated successfully');  
  });

  afterAll((done) => {
    if (server) {
      server.close(done);  // This correctly uses the server object's close method
    } else {
      done();  // Safely handle cases where the server might not be defined
    }
  });  
});
  