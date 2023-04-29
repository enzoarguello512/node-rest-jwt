import app from '../../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server-core';
import { Global } from '../../../services/mongoose/types/memory.server.interface';
import BaseError from '../../../common/error/base.error';

declare const global: Global;

let firstUserIdTest = '';

const firstUserBody = {
  email: `github.enzoarguello512+1@themorfi.com`,
  password: '7BDADeX19Ou',
  firstName: 'test',
  address: 'test',
  age: 24,
  phoneNumber: '31424412124',
};

let accessToken = '';
let refreshToken = '';
const newFirstName = 'Enzo';
const newFirstName2 = 'Enzo2';
const newLastName2 = 'Arguello';

function expectValidTokens(res: supertest.Response): void {
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
  expect(res.body.accessToken).to.be.a('string');
  accessToken = res.body.accessToken;
  refreshToken = res.header['set-cookie'][0];
}

function expectValidObject(res: supertest.Response): void {
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
}

describe('users and auth endpoints', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    // stop mongo test server
    const instance: MongoMemoryServer = global.__MONGOINSTANCE__;
    instance.stop();
    // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  it('should allow a POST to /users', async function () {
    try {
      const res = await request.post('/users').send(firstUserBody);
      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.be.an('string');
      firstUserIdTest = res.body.id;
    } catch (err) {
      throw new BaseError(
        'Failed when trying to create a user',
        err,
        'POST to /users'
      );
    }
  });

  it('should allow a POST to /auth', async function () {
    try {
      const res = await request.post('/auth').send(firstUserBody);
      expectValidTokens(res);
    } catch (err) {
      throw new BaseError('Fail to authenticate', err, 'POST to /users');
    }
  });

  it('should allow a GET from /users/:userId with an access token', async function () {
    const res = await request
      .get(`/users/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expectValidObject(res);
    expect(res.body.id).to.be.a('string');
    expect(res.body.id).to.equal(firstUserIdTest);
    expect(res.body.email).to.equal(firstUserBody.email);
  });

  describe('with a valid access token', function () {
    it('should disallow a GET to /users', async function () {
      const res = await request
        .get(`/users`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(401);
    });

    it('should disallow a PATCH to /users/:userId', async function () {
      const res = await request
        .patch(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          firstName: newFirstName,
        });
      expect(res.status).to.equal(401);
    });

    it('should disallow a PATCH to /users/:userId with an nonexistant ID', async function () {
      const res = await request
        .patch(`/users/i-do-not-exist`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Test1',
          lastName: 'Test1',
          permissionLevel: 256,
        });
      expect(res.status).to.equal(400);
    });

    it('should disallow a PATCH to /users/:userId trying to change the permission level', async function () {
      const res = await request
        .patch(`/users/${firstUserIdTest}/permissionLevel/${256}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Test1',
          lastName: 'Test1',
        });
      expect(res.status).to.equal(401);
    });

    //it('should allow a PUT to /users/:userId/permissionLevel/2 for testing', async function () {
    //const res = await request
    //.put(`/users/${firstUserIdTest}/permissionLevel/2`)
    //.set({ Authorization: `Bearer ${accessToken}` })
    //.send({});
    //expect(res.status).to.equal(204);
    //});

    describe('with a new permission level', function () {
      it('should allow a GET to /auth/refresh-token', async function () {
        const res = await request
          .get('/auth/refresh-token')
          .set({
            Authorization: `Bearer ${accessToken}`,
            Cookie: [refreshToken],
          })
          .send();
        expectValidTokens(res);
      });

      //it('should allow a PATCH to /users/:userId to change first and last names', async function () {
      //const res = await request
      //.patch(`/users/${firstUserIdTest}`)
      //.set({ Authorization: `Bearer ${accessToken}` })
      //.send({
      //email: firstUserBody.email,
      //password: firstUserBody.password,
      //firstName: newFirstName2,
      //lastName: newLastName2,
      //});
      //expect(res.status).to.equal(204);
      //});

      it('should allow a GET from /users/:userId and should have a new full name', async function () {
        const res = await request
          .get(`/users/${firstUserIdTest}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send();
        expectValidObject(res);
        expect(res.body.id).to.be.a('string');
        //expect(res.body.firstName).to.equal(newFirstName2);
        //expect(res.body.lastName).to.equal(newLastName2);
        expect(res.body.email).to.equal(firstUserBody.email);
        expect(res.body.id).to.equal(firstUserIdTest);
      });

      it('should allow a DELETE from /users/:userId', async function () {
        const res = await request
          .delete(`/users/${firstUserIdTest}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send();
        expect(res.status).to.equal(204);
      });
    });
  });
});
