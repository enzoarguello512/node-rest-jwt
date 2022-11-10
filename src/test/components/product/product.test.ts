import app from '../../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server-core';
import { Global } from '../../../services/mongoose/types/memory.server.interface';
import { populateMongoDb } from '../../../scripts/functions.mongoose';
import path from 'path';

declare const global: Global;

let firstProductIdTest = '';

describe('products endpoints', function () {
  let request: supertest.SuperAgentTest;
  before(async function () {
    request = supertest.agent(app);
    await populateMongoDb();
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

  it('should allow a GET (Get all products) from /products', async function () {
    const res = await request.get(`/products`).send();
    expect(res.status).to.equal(200); // OK
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('array');
    firstProductIdTest = res.body[0].id;
  });

  it('should allow a POST (Add a new product) from /products', async function () {
    const res = await request
      .post(`/products`)
      .field({
        name: 'test product',
        description: 'test product',
        hasFreeShipping: true,
        discount: 50,
        price: 999.0,
        stock: 999,
      })
      .attach('image', path.join(__dirname, 'test-product-image.jpg'));
    expect(res.status).to.equal(201); // CREATED
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
  });

  it('should allow a GET (Find an individual product) from /products/productId', async function () {
    const res = await request.get(`/products/${firstProductIdTest}`).send();
    expect(res.status).to.equal(200); // OK
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    expect(res.body.id).to.equal(firstProductIdTest);
  });

  it('should allow a PATCH (Update a product) from /products/:productId', async function () {
    const res = await request.patch(`/products/${firstProductIdTest}`).send({
      name: 'updated name!',
    });
    expect(res.status).to.equal(204); // NO_CONTENT
  });

  it('should allow a DELETE (Delete a product) from /products/:productId', async function () {
    const res = await request.delete(`/products/${firstProductIdTest}`).send();
    expect(res.status).to.equal(204); // NO_CONTENT
  });
});
