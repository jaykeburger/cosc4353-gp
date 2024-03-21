import app from '../server.js'; // Adjust this path
import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
const server = use(chaiHttp);


describe('Profile Info Endpoint', () => {
  it('should return a 400 status for empty name', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ name: '' }) // Sending an empty name to test validation
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Name must contain letters and cannot be empty');
        done();  
      });
  });


  it('should return a 400 status for character over 50 characters', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe",
        "add1" : "123 Appleseed Ln",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Name must be less than 50 characters');
        done();   
      });
  });

  it('should return a 400 status for character an empty Address 1', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Address 1 must contain letters and cannot be empty');
        done();   
      });
  });

  it('should return a 400 status for character limit over 100 in Address 1', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Address 1 must be less than 100 characters');
        done();   
      });
  });

  it('should return a 400 status for character limit over 100 in Address 2', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln123 Appleseed Ln",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Address 2 must be less than 100 characters');
        done();   
      });
  });


  it('should return a 400 status for an empty city field', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('City must contain cannot be empty');
        done();   
      });
  });

  it('should return a 400 status for a city entry with numbers', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "Houston1",
        "state" : "TX",
        "zipcode" : "12345"
       })   
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('City must only contain letters');
        done(); 
      });
  });

  it('should return a 400 status for city with 100+ characters', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "HoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHouston",
        "state" : "TX",
        "zipcode" : "12345"
       }) 
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('City must be less than 100 characters');
        done(); 
      });
  });

  it('should return a 400 status for empty State', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "Houston",
        "state" : "",
        "zipcode" : "12345"
       }) 
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('State cannot be empty');
        done(); 
      });
  });

  it('should return a 400 status for empty State', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : ""
       }) 
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Zipcode cannot be empty');
        done(); 
      });
  });
  it('should return a 400 status for zipcode greater than 9', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "12345678910"
       }) 
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Zipcode must be less than 9 characters');
        done();  
      });
  });

  it('should return a 400 status for zipcode less than 5', done => {
    server.request(app)
      .post('/profileInfo')
      .send({ 
        "name" : "John Doe",
        "add1" : "123 Appleseed",
        "add2" : "",
        "city" : "Houston",
        "state" : "TX",
        "zipcode" : "1234"
       }) 
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Zipcode must be at least 5 characters');
        done();  
      });
  });

});

