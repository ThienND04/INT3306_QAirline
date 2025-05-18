require('dotenv').config({ 'path': '.env.test' });
const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../app');

const expect = chai.expect;

describe('User Controller Test', function () {
    let token = '';
    let userId = '';

    const testUser = {
        email: 'test@example.com',
        password: '123456',
        phoneNumber: '0123456789',
        address: 'Hanoi',
        lastName: 'Nguyen',
        middleAndFirstName: 'Van A',
        displayOrder: 1,
        gender: 'Nam',
        birthDate: { day: 1, month: 1, year: 1990 },
        nationality: 'Vietnam',
        language: 'Vietnamese'
    };

    describe('POST /api/v1/users/register', function () {
        it('should register a new user', function (done) {
            request(app)
                .post('/api/v1/users/register')
                .send(testUser)
                .expect(201)
                .end((err, res) => {
                    console.log('Register Response: ', res.body);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('email', testUser.email);
                    userId = res.body.user._id;
                    done(err);
                });
        });

        it('should not register with existing email', function (done) {
            request(app)
                .post('/api/v1/users/register')
                .send(testUser)
                .expect(400, done);
        });
    });

    describe('POST /api/v1/users/login', function () {
        it('should login with correct credentials', function (done) {
            request(app)
                .post('/api/v1/users/login')
                .send({ email: testUser.email, password: testUser.password })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('token');
                    token = res.body.token;
                    done(err);
                });
        });

        it('should not login with wrong password', function (done) {
            request(app)
                .post('/api/v1/users/login')
                .send({ email: testUser.email, password: 'WrongPass' })
                .expect(401, done);
        });
    });

    describe('GET /api/v1/users/me', function () {
        it('should get user profile with valid token', function (done) {
            console.log('Token: ', token);
            request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .end((err, res) => {
                    console.log('Response: ', res.body);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('email', testUser.email);
                    done(err);
                });
        });

        it('should not get profile without token', function (done) {
            request(app)
                .get('/api/v1/users/me')
                .expect(401, done);
        });
    });

    describe('PUT /api/v1/users/update', function () {
        it('should update user profile', function (done) {
            request(app)
                .put('/api/v1/users/update')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Updated Name' })
                .expect(200)
                .end((err, res) => {
                    console.log('Update Response: ', res.body);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('id', userId);
                    expect(res.body.user).to.have.property('name', 'Updated Name');
                    done(err);
                });
        });
    });
});